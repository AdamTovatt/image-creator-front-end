import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PsdFilesPage from "./pages/PsdFilesPage";
import ExportPage from "./pages/ExportPage";
import { AlertProvider } from "./components/AlertProvider/AlertProvider";

function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/psd-files" element={<PsdFilesPage />} />
          <Route path="/export/:fileName" element={<ExportPage />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
