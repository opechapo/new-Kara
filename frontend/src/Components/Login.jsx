// src/components/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const Login = () => {
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      // Connect to MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      console.log('Wallet address:', walletAddress);

      // Fetch nonce
      const nonceResponse = await fetch(`http://localhost:3000/user/nonce/${walletAddress}`);
      if (!nonceResponse.ok) throw new Error('Failed to fetch nonce');
      const { nonce } = await nonceResponse.json();
      console.log('Nonce:', nonce);

      // Sign message
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = `Connect wallet with nonce: ${nonce}`;
      const signature = await signer.signMessage(message);
      console.log('Signature:', signature);

      // Connect wallet (register or login)
      const response = await fetch('http://localhost:3000/user/connect-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, signature, email: 'test@example.com' }), // Optional email
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Connect successful, token:', data.token);
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        console.error('Connect failed:', data);
      }
    } catch (err) {
      console.error('Connect error:', err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleWalletConnect}
        className="bg-purple-900 text-white px-4 py-2 rounded-md mt-4"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Login;