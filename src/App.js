import logo from './logo.svg';
import './App.css';
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={`/audiogram`} element={<Home />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
