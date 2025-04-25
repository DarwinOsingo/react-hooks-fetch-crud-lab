import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import App from "../components/App"; // Correct the import path
import '@testing-library/jest-dom';  // Ensure this is imported for matchers like toBeInTheDocument

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          prompt: "lorem testum 1",
          answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
          correctIndex: 0,
        },
        {
          id: 2,
          prompt: "lorem testum 2",
          answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
          correctIndex: 2,
        },
      ]),
  })
);

test("displays question prompts after fetching", async () => {
  render(<App />);

  await act(async () => {
    // Wait for the question prompts to appear after fetching
    await screen.findByText(/lorem testum 1/i);
  });

  // Assert that the prompt is in the document
  expect(screen.getByText(/lorem testum 1/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/New Question/i));

  fireEvent.change(screen.getByPlaceholderText(/Enter question prompt/i), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 1/i), {
    target: { value: "Answer 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 2/i), {
    target: { value: "Answer 2" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 3/i), {
    target: { value: "Answer 3" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Answer 4/i), {
    target: { value: "Answer 4" },
  });

  // Submit form
  fireEvent.click(screen.getByText(/Add Question/i));

  await waitFor(() =>
    expect(screen.getByText(/Test Prompt/i)).toBeInTheDocument()
  );
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  await act(async () => {
    await screen.findByText(/lorem testum 1/i);
  });

  fireEvent.click(screen.getByText(/Delete/i));

  await waitFor(() =>
    expect(screen.queryByText(/lorem testum 1/i)).not.toBeInTheDocument()
  );
});
