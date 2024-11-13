const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// Webhook endpoint
router.post("/", async (req, res) => {
  console.log("⚡ Webhook endpoint hit");
  try {
    const { type, data } = req.body;

    if (type === "user.created") {
      const { email_addresses, first_name, last_name } = data;

      // Check if user already exists
      const existingUser = await User.findOne({
        email: email_addresses[0].email_address,
      });

      if (existingUser) {
        return res.status(200).send("User already exists");
      }

      const user = new User({
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        password: "clerk-auth",
        clerkId: data.id,
        gender: null,
        bodyType: null,
        fitnessGoals: null,
        age: null,
        weight: null,
        height: null,
      });

      await user.save();
      console.log("✅ User created in MongoDB:", user);
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
