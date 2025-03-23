import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Record from "./pages/table";
import Ap from "./pages/appoiment";


import Updatee from "./pages/updpate";
import Buss from "./pages/bus";






export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

       

        <Route path="/updateee/:iddd" element={<Updatee />} />
        <Route path="/myticket" element={<Record />} />
        <Route path="/add" element={<Ap/>} />
        <Route path="/" element={<Buss/>} />
     
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
