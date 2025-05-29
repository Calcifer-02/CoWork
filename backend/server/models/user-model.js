const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
   {
      email: {
         type: String,
         unique: true,
         required: true,
         match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      password: { type: String, required: true },
      isActivated: { type: Boolean, default: false },
      activationLink: { type: String },
   },
   { timestamps: true }
);

UserSchema.methods.comparePassword = async function (candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.set("toJSON", {
   transform: (doc, ret) => {
      delete ret.password;
      return ret;
   },
});

module.exports = model("User", UserSchema);
