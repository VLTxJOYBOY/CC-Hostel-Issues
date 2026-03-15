import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    description: String,

    imageUrl: String,

    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;