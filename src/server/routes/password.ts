import { Hono } from "hono";
import db from "../db";
import bcrypt from "bcryptjs";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

// PATCH /api/users/:id/password - Update user password
app.patch("/:id/password", zValidator("json", passwordSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const { currentPassword, newPassword } = c.req.valid("json");

    // Find user
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return c.json({ message: "Current password is incorrect" }, 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return c.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return c.json({ message: "Failed to update password" }, 500);
  }
});

export default app;
