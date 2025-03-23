import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Record from "./pages/table";
import Ap from "./pages/appoiment";

import Aupdate from "./pages/Aupdate";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

       

        <Route path="/updatee/:iddd" element={<Aupdate />} />
        <Route path="/" element={<Record />} />
        <Route path="/add" element={<Ap/>} />
     
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
