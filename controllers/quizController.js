import { submitQuizAttempt, getQuizByLesson } from "../models/quizModel.js";
import { successResponse } from "../utils/responseHandler.js";

export const submitQuiz = async (req, res, next) => {
  try {
    const { lessonId, answers } = req.body;

    const { data: questions } = await getQuizByLesson(lessonId);

    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        score++;
      }
    });

    await submitQuizAttempt({
      user_id: req.user.id,
      lesson_id: lessonId,
      score,
      total_questions: questions.length
    });

    return successResponse(res, "Quiz submitted", {
      score,
      total: questions.length
    });

  } catch (error) {
    next(error);
  }
};

export const fetchQuiz = async (req, res) => {
  try {
    const { data, error } = await getQuizByLesson(req.params.lessonId);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

