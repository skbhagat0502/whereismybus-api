import Bus from "../models/bus.js";

export const addBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    return res.status(201).json({ status: true, data: newBus });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ status: false, message: "Bus not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Bus data deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    return res.status(200).json({ status: true, data: bus });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};
