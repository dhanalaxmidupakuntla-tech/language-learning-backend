export const calculateStreak = (lastStudyDate, currentStreak) => {
  const today = new Date().toDateString();
  const lastDate = new Date(lastStudyDate).toDateString();

  if (today === lastDate) {
    return currentStreak; // Already studied today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (new Date(lastStudyDate).toDateString() === yesterday.toDateString()) {
    return currentStreak + 1; // Continue streak
  }

  return 1; // Reset streak
};