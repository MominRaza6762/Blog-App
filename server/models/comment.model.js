import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    user : {
      type : Schema.Types.ObjectId,
      ref : "User",
      requierd: true,
    },
    post : {
      type : Schema.Types.ObjectId,
      ref : "Post",
      requierd: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
