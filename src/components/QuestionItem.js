import React from "react";

function QuestionItem({ question, onDelete }) {
  return (
    <li>
      <h3>{question.prompt}</h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={() => onDelete(question.id)}>Delete</button>
    </li>
  );
}

export default QuestionItem;
