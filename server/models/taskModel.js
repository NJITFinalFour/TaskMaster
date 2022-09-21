import mongoose from "mongoose";

//task Schema
const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    task_id: {
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
    assigned_date: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    isComplete: {
      type: String,
      default: "NO",
      required: false,
    },
  },
  { timestamps: true }
);

const taskData = mongoose.model("taskData", taskSchema);

export default taskData;
