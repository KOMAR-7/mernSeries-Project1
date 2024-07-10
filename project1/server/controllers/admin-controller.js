const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error from admin user: ", error);
        next(error);
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        console.log("Error from admin contact: ", error);
        next(error);
    }
}
// get single user data start
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error from admin user: ", error);
        next(error);
    }
}
// get single user data end

// update single user data start
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const updatedData = await User.updateOne(
            { _id: id },
            { $set: updatedUser }
        )
        return res.status(200).json(updatedData)
    } catch (error) {
        console.log("Error from admin user: ", error);
        next(error);
    }
}
// update single user data end

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Deleted Successfully" })
    } catch (error) {
        console.log("Error deleting contact: ", error);
    }

}

const getAllServices = async (req, res) => {
    try {
        const service = await Service.find();
        if (!service || service.length === 0) {
            return res.status(404).json({ message: "No service found" });
        }
        return res.status(200).json(service);
    } catch (error) {
        console.log("Error from backend service: ", error);
        next(error);
    }
}

const deleteServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({ _id: id });
        return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.log("Error from backend servcice delete: ", error)
    }
}
const getServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findOne({ _id: id });
        if (service) {
            return res.status(200).json(service);
        } else {
            return res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        console.log("Error from backend service by id: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedService = req.body;
        const updatedData = await Service.updateOne(
            { _id: id },
            { $set: updatedService }
        )
        return res.status(200).json(updatedData)
    } catch (error) {
        console.log("Error from admin user: ", error);
        next(error);
    }
}

const addService = async (req, res) => {
    try {
        const { service, description, price, provider } = req.body;

        // Ensure all required fields are provided
        if (!service || !description || !price || !provider) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const newService = await Service.create({
            service,
            description,
            price,
            provider,
        });

        res.status(200).json({
            message: "Service added successfully",
            service: newService
        });

        console.log("Service data from the backend: ", newService);
    } catch (error) {
        res.status(500).json({
            message: `Error from backend: ${error.message}`,
        });
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById, getAllServices, deleteServiceById, getServiceById, updateServiceById, addService };