import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaUpload, FaSpinner } from 'react-icons/fa'; // Added FaSpinner
import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import EscrowArtifact from '../../Escrow.json';

// Simple Error Boundary
class CartErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-500">Something went wrong: {this.state.errorMessage}</p>
          <button
            onClick={() => this.setState({ hasError: false, errorMessage: '' })}
            className="mt-4 text-purple-900 underline hover:text-purple-700"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Shared fetchWithRetry utility
const fetchWithRetry = async (url, options = {}, retries = 3, timeout = 30000) => {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include',
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};

// In-memory cache
const cache = {
  cart: null,
  lastFetched: {},
};

const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition"
      >
        Close
      </button>
    </div>
  </div>
);

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fetchCart = useCallback(async (force = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalMessage('Please connect your wallet.');
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    const cacheKey = 'cart';
    if (!force && cache[cacheKey] && Date.now() - cache.lastFetched[cacheKey] < 5 * 60 * 1000) {
      setCartItems(cache[cacheKey]);
      setIsLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetchWithRetry('http://localhost:3000/cart', { headers });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch cart');
      
      // Filter out items with null products
      const validItems = (data.data.items || []).filter(item => item.product != null);
      if (validItems.length < data.data.items.length) {
        // Update backend to remove invalid items
        await updateCartBackend(validItems);
      }
      
      cache[cacheKey] = validItems;
      cache.lastFetched[cacheKey] = Date.now();
      setCartItems(validItems);
      setIsLoading(false);
    } catch (err) {
      setModalMessage(err.message);
      setShowModal(true);
      setIsLoading(false);
    }
  }, []);

  const updateCartBackend = async (validItems) => {
    const token = localStorage.getItem('token');
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      await fetchWithRetry('http://localhost:3000/cart', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ items: validItems }),
      });
    } catch (err) {
      console.warn('Failed to update cart backend:', err.message);
    }
  };

  const removeFromCart = useCallback(async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await fetchWithRetry(`http://localhost:3000/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers,
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to remove item');
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      cache.cart = updatedItems;
      cache.lastFetched.cart = Date.now();
      setCartItems(updatedItems);
    } catch (err) {
      setModalMessage(err.message);
      setShowModal(true);
    }
  }, [cartItems]);

  const handleCheckout = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalMessage('Please connect your wallet.');
      setShowModal(true);
      return;
    }
    if (cartItems.length === 0) {
      setModalMessage('Your cart is empty.');
      setShowModal(true);
      return;
    }

    const provider = await detectEthereumProvider();
    if (!provider) {
      setModalMessage('Please install MetaMask');
      setShowModal(true);
      return;
    }

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const buyerAddress = await signer.getAddress();

    try {
      const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
      const totalInWei = ethers.utils.parseEther(totalAmount.toString());
      const balance = await ethersProvider.getBalance(buyerAddress);
      if (balance.lt(totalInWei)) {
        throw new Error('Insufficient ETH balance to cover the purchase');
      }

      const escrowContracts = [];
      for (const item of cartItems) {
        const { product, quantity } = item;
        console.log(`Processing escrow for ${product.name} (Qty: ${quantity})`);

        const response = await fetchWithRetry('http://localhost:3000/escrow/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product._id,
            amount: product.price * quantity,
            paymentToken: product.paymentToken,
            quantity,
          }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Failed to initiate escrow');
        const escrowId = data.data.escrowId;

        const priceInEther = product.price * quantity;
        const valueInWei = ethers.utils.parseEther(priceInEther.toString());
        const EscrowFactory = new ethers.ContractFactory(EscrowArtifact.abi, EscrowArtifact.bytecode, signer);
        const escrowContract = await EscrowFactory.deploy(product.owner, {
          value: valueInWei,
          gasLimit: 3000000,
        });
        await escrowContract.deployed();
        console.log(`Escrow contract for ${product.name} deployed at: ${escrowContract.address}`);

        await fetchWithRetry(`http://localhost:3000/escrow/${escrowId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractAddress: escrowContract.address, status: 'held' }),
        });

        escrowContracts.push({ id: escrowId, contractAddress: escrowContract.address });
      }

      await fetchWithRetry('http://localhost:3000/cart/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      cache.cart = [];
      cache.lastFetched.cart = Date.now();
      setCartItems([]);
      alert(`Escrow contracts deployed successfully:\n${escrowContracts.map(e => e.contractAddress).join('\n')}`);
      navigate('/profile');
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err.code === 'ACTION_REJECTED'
        ? 'Transaction rejected by user in MetaMask.'
        : err.message || 'Failed to complete checkout';
      setModalMessage(errorMessage);
      setShowModal(true);
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) {
    return (
      <div className="p-6 w-full flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-purple-900 text-4xl" />
      </div>
    );
  }

  return (
    <CartErrorBoundary>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8 pt-24">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          item.product?.generalImage
                            ? `http://localhost:3000${item.product.generalImage}`
                            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
                        }
                        alt={item.product?.name || 'Product Unavailable'}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
                        }}
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {item.product?.name || 'Product Unavailable'}
                        </h2>
                        <p className="text-gray-600">
                          {item.quantity} x {item.product?.price || 'N/A'} {item.product?.paymentToken || ''}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-semibold">
                  Total:{' '}
                  {cartItems.reduce((total, item) => total + item.quantity * (item.product?.price || 0), 0)}{' '}
                  {cartItems[0]?.product?.paymentToken || ''}
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-purple-900 text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <ErrorModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </CartErrorBoundary>
  );
};

export default memo(Cart);