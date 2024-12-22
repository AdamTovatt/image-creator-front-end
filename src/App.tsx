import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PsdFilesPage from "./pages/PsdFilesPage"; // Import the PsdFilesPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/psd-files" element={<PsdFilesPage />} />{" "}
        {/* Route to PSD Files page */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
