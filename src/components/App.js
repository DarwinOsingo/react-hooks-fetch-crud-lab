import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";
import { data } from "../mocks/data"; // Correct path to mocks/data.js


function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("Form");

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/questions");
      const fetchedQuestions = await response.json();
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" && <QuestionForm onAddQuestion={handleAddQuestion} />}
      {page === "List" && (
        <section>
          <h2>Questions</h2>
          <ul>
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onDelete={handleDeleteQuestion}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default App;
