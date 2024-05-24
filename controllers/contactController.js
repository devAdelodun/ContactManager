import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";


export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_Id: req.user.id });
    res.status(200).json(contacts);
});

export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    console.log("Request Body:", req.body); 

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_Id: req.user.id, 
    });

    console.log("Contact Created:", contact);

    res.status(201).json(contact);
});

export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_Id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});


export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_Id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this contact");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).send("Contact deleted");
});
