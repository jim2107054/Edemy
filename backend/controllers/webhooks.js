import { Webhook } from "svix";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔔 Clerk Webhook Received");

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify signature using raw buffer (req.body is a Buffer now)
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    console.log("✅ Verified Clerk Event:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        console.log("👤 User Created:", userData);
        return res.status(201).json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 User Updated:", userData);
        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User Deleted:", data.id);
        return res.status(200).json({ success: true });
      }

      default: {
        console.log("⚠️ Unhandled Event Type:", type);
        return res.status(200).json({ success: true, message: "Unhandled event" });
      }
    }
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};
