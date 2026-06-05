import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Collection from "./pages/Collection";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/collection/:id" element={<Collection />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 
