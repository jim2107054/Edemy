import { Webhook } from "svix";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// API controller function to Manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook using the raw body
    // const payload = req.rawBody || JSON.stringify(req.body);
    await whook.verify(req.body, {
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
        // => Can't store user data from clerk directly in the database. need to fix it.
        // Create a new user
        await User.create(userData);
        res.json({});
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
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      // Handle user deleted event
      case "user.deleted": {
        // Detete the user from the database
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
