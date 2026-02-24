import { getAllLessons, getLessonById } from "../models/lessonModel.js";

export const fetchLessons = async (req, res) => {
  try {
    const { data, error } = await getAllLessons();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchLessonById = async (req, res) => {
  try {
    const { data, error } = await getLessonById(req.params.id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};