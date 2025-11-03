import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/register", async (req, res) => {
  try {
    const { profession, interests, language } = req.body;
    const user = { profession, interests, language, createdAt: new Date() };
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/moodapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ✅ Register route
app.post("/register", async (req, res) => {
  const { name, email, age, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, age, password });
    await user.save();
    res.json({ message: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
