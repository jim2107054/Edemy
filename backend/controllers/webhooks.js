import { Webhook } from "svix";
import User from "../models/user.js";

// API controller function to Manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Extract the event type and data
    const { data, type } = req.body;

    // Handle the event based on its type(user.created, user.updated, user.deleted)
    switch (type) {
      // Handle user created event
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        // Check if user already exists
        const existingUser = await User.findById(userData._id);
        if (existingUser) {
          return res.json({ success: false, message: "User already exists" });
        }
        // Create a new user
        await User.create(userData);
        res.json({ success: true, message: "User created successfully" });
        break;
      }

      // Handle user updated event
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        // Update the user in the database
        await User.findByIdAndDelete(data.id, userData);
        res.json({ success: true, message: "User updated successfully" });
        break;
      }

      // Handle user deleted event
      case "user.deleted": {
        // Detete the user from the database
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted successfully" });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
