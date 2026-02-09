const Vendor = require("../models/Vendor");

exports.addVendor = async (req, res) => {
    try {
        const { name, email, contact, location } = req.body;
        const vendor = new Vendor({ name, email, contact, location });
        await vendor.save();
        res.status(201).json(vendor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().sort({ createdAt: -1 });
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) return res.status(404).json({ msg: "Vendor not found" });
        res.json(vendor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.json({ msg: "Vendor deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};