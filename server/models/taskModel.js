import mongoose from "mongoose";

//task Schema
const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    organization_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: false,
    },
    isComplete: {
      type: String,
      default: "NO",
      required: true,
    },
    notes: {
      type: String
    },
  },
  { timestamps: true }
);

const taskData = mongoose.model("taskData", taskSchema);

export default taskData;
