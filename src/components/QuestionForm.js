import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddQuestion(data);
        // Reset form
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      });
  }

  function handleAnswerChange(index, value) {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter question prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        ))}
        <label htmlFor="correct-answer">Correct Answer:</label>
        <select
          id="correct-answer"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
        >
          <option value="0">Answer 1</option>
          <option value="1">Answer 2</option>
          <option value="2">Answer 3</option>
          <option value="3">Answer 4</option>
        </select>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
