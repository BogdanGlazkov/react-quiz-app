import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";
import Quiz from "./components/Quiz";
import QuizSummary from "./components/QuizSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
        <Route path="/play/quiz" element={<Quiz />} />
        <Route path="/play/summary" element={<QuizSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
