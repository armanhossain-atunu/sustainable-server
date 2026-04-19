"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
}, {
    timestamps: true,
});
//
// 🔐 PRE-SAVE HOOK (Password Hashing)
//
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // only hash if password is modified
        if (!user.isModified("password"))
            return;
        user.password = yield bcrypt_1.default.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS || 10));
    });
});
//
// 📤 POST-SAVE HOOK (Remove password before returning)
//
userSchema.post("save", function (doc) {
    console.log(`[User Created]: ${doc.email}`);
    // remove password from returned object
    doc.password = undefined;
});
//
// 🧩 MODEL EXPORT (fix overwrite issue in dev/serverless)
//
exports.User = (0, mongoose_1.model)("User", userSchema);
