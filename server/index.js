require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require("joi");
const UserModel = require("./models/Users.js");

const app = express();

app.use(cors({ origin: ["https://mern-curd-frontend-alpha.vercel.app"] }));
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(0).max(120).required(),
  email: Joi.string().email().required(),
});

app.post("/createUser", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });

  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.json({ success: true, data: deletedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
