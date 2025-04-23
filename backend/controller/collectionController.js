const asyncHandler = require("express-async-handler");
const Collection = require("../models/Collection");
const Store = require("../models/Store");
const path = require("path");
const fs = require("fs").promises;

const createCollection = asyncHandler(async (req, res) => {
  const { name, shortDescription, store, description } = req.body;
  const owner = req.user._id;

  if (!name || !shortDescription || !store) {
    res.status(400);
    throw new Error("Name, short description, and store are required");
  }

  const storeExists = await Store.findById(store);
  if (!storeExists || storeExists.owner.toString() !== owner.toString()) {
    res.status(403);
    throw new Error("Store not found or not authorized");
  }

  const collectionData = { name, shortDescription, store, description, owner };
  const uploadPath = path.join(__dirname, "..", "uploads");

  if (req.files && req.files.generalImage) {
    const file = req.files.generalImage;
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadPath, fileName);
    console.log("Saving file to:", filePath);

    try {
      await file.mv(filePath);
      console.log("File saved successfully");
      collectionData.generalImage = `/uploads/${fileName}`; // Store with /uploads/
    } catch (err) {
      console.error("File save error:", err);
      throw new Error(`Failed to save file: ${err.message}`);
    }
  }

  const collection = await Collection.create(collectionData);
  res.status(201).json(collection);
});

const updateCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, shortDescription, store, description } = req.body;

  const collection = await Collection.findById(id);
  if (!collection || collection.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Collection not found or not authorized");
  }

  if (store) {
    const storeExists = await Store.findById(store);
    if (!storeExists || storeExists.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Store not found or not authorized");
    }
    collection.store = store;
  }

  collection.name = name || collection.name;
  collection.shortDescription = shortDescription || collection.shortDescription;
  collection.description = description || collection.description;

  const uploadPath = path.join(__dirname, "..", "uploads");
  if (req.files && req.files.generalImage) {
    const file = req.files.generalImage;
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadPath, fileName);
    console.log("Saving file to:", filePath);

    try {
      await file.mv(filePath);
      console.log("File saved successfully");
      collection.generalImage = `/uploads/${fileName}`; // Store with /uploads/
    } catch (err) {
      console.error("File save error:", err);
      throw new Error(`Failed to save file: ${err.message}`);
    }
  }

  const updatedCollection = await collection.save();
  res.status(200).json(updatedCollection);
});

const deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findById(id);
  if (!collection || collection.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Collection not found or not authorized");
  }

  if (collection.generalImage) {
    const filePath = path.join(__dirname, "..", "uploads", collection.generalImage.replace('/uploads/', ''));
    try {
      await fs.unlink(filePath);
      console.log("Deleted file:", filePath);
    } catch (err) {
      console.error("File deletion error (ignored):", err.message);
    }
  }

  await Collection.deleteOne({ _id: id });
  res.status(200).json({ message: "Collection deleted successfully" });
});

module.exports = { createCollection, updateCollection, deleteCollection };