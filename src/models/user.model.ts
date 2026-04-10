import bcrypt from "bcrypt";
import { Schema, model, CallbackError } from "mongoose";
import { TUser } from "../types/user.interface";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo:{ type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//
// 🔐 PRE-SAVE HOOK (Password Hashing)
//
userSchema.pre("save", async function () {
  const user = this as any;

  // only hash if password is modified
  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS || 10)
  );
});

//
// 📤 POST-SAVE HOOK (Remove password before returning)
//
userSchema.post("save", function (doc) {
  console.log(`[User Created]: ${doc.email}`);

  // remove password from returned object
  doc.password = undefined as any;
});

//
// 🧩 MODEL EXPORT (fix overwrite issue in dev/serverless)
//
export const User = model<TUser>("User", userSchema);