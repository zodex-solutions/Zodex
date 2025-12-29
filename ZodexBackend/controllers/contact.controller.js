const Contact = require("../models/contact.model");
const mongoose = require("mongoose");

// ✅ CREATE (POST)
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ FETCH ALL (GET)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ FETCH BY ID (GET)
const getContactById = async (req, res) => {
  try {
    // optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE BY ID (PUT)
const updateContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ DELETE BY ID
const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ CommonJS export (FIX)
module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
