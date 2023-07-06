import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/QuizInstructions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
