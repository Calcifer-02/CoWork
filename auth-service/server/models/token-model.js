const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: "User" },
   refreshToken: { type: String, required: true },
   expiresAt: { type: Date, default: Date.now, expires: "7d" },
});

TokenSchema.index({ refreshToken: 1 });

module.exports = model("Token", TokenSchema);
