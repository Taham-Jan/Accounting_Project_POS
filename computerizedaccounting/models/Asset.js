const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
  {
    accountname: { type: String, required: true, unique: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);
