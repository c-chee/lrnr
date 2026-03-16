export async function generateQuiz({
  topic,
  level = "beginner",
  numQuestions = 5,
  questionStyle = "multiple_choice",
}) {
  const res = await fetch("http://localhost:3000/api/quiz/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      difficulty: level,
      numQuestions,
      style: questionStyle,
    }),
  });

  const data = await res.json();

  return data.quiz;
}