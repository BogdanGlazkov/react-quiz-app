import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";
import Quiz from "./components/Quiz";
import QuizSummary from "./components/QuizSummary";

function App() {
  return (
    <HashRouter hashType="slash">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
        <Route path="/play/quiz" element={<Quiz />} />
        <Route path="/play/summary" element={<QuizSummary />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
