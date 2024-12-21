import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ValidateMagicLinkPage from "./pages/ValidateMagicLinkPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/auth/validate-magic-link"
          element={<ValidateMagicLinkPage />}
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
