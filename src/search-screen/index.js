import React, { useState } from "react";
import axios from "axios";

const popularQuestions = [
  "What are the best dog training tips?",
  "How often should I groom my dog?",
  "What are some common dog health issues?",
  "How do I make homemade dog food?",
  "What are the best dog breeds for families?",
];

function SquareScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async (question) => {
    try {
      const response = await axios.post("/api/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
      setAnswer("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 order-1 md:order-1 p-4">
        <h2 className="text-xl font-bold mb-4">Ask ChatGPT About Dogs</h2>
        <textarea
          className="border rounded p-2 mb-4 w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="4"
          placeholder="Ask anything about dogs..."
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full"
          onClick={() => askQuestion(question)}
        >
          Ask
        </button>
        <h3 className="text-lg font-semibold mb-2">Popular Questions:</h3>
        {popularQuestions.map((q, index) => (
          <button
            key={index}
            className="bg-gray-200 text-black py-2 px-4 rounded mb-2 w-full text-left"
            onClick={() => askQuestion(q)}
          >
            {q}
          </button>
        ))}
        {answer && (
          <div className="mt-4 p-4 border rounded bg-white">
            <h2 className="text-xl font-semibold mb-2">Answer:</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SquareScreen;
