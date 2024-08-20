import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
        unique: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  { timestamps: true }
);

const Saved = mongoose.model("Saved", savedSchema);
export default Saved;
