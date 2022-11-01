import taskData from "../models/taskModel.js";

export const getTask = async (req, res) => {
  try {
    const alltasks = await taskData.find().sort({ createdAt: -1 });
    res.status(200).json(alltasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const task = await taskData.findById(id);
  if (!task) {
    return res.status(404).json({ error: "No Such Task" });
  }
  res.status(200).json(task);
};
// m
export const createTask = async (req, res) => {
  try {
    const task = req.body;
    const newTask = new taskData(task);
    try {
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await taskData.findByIdAndRemove(id).exec();
    res.send("Record Deleted Successfully!");
  } catch (error) {
    console.log(error);
  }
};
/*export const deleteAllTasks = async (req, res) => {
  // const id = req.params.id;
  try {
    await taskData.deleteMany().exec();
    res.send("Record Deleted Successfully!");
  } catch (error) {
    console.log(error);
  }
};*/

export const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await taskData.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(404).json({ error: "No Such Task" });
  }
  res.status(200).json(task);
};

export const findTasksByUser = async (req, res) => {
  try {
    const tasks = await taskData.find({ user_id: req.params.user })
    res.send(tasks)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
}

export const findTasksByOrg = async (req, res) => {
  try {
    const tasks = await taskData.find({ organization_id: req.params.organization })
    res.send(tasks)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}