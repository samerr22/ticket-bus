import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Record from "./pages/table";
import Ap from "./pages/appoiment";

import Aupdate from "./pages/Aupdate";
import Updatee from "./pages/updpate";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

       

        <Route path="/updateee/:iddd" element={<Updatee />} />
        <Route path="/" element={<Record />} />
        <Route path="/add" element={<Ap/>} />
     
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
