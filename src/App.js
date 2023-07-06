import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";
import Quiz from "./components/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
        <Route path="/play/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
