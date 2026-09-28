import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Donate from "./pages/Donate";
import ReportAnimal from "./pages/ReportAnimal";
import About from "./pages/About";
import Admin from "./pages/Admin";

import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/donate"
            element={<Donate />}
          />

          <Route
            path="/report"
            element={<ReportAnimal />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment-failed"
            element={<PaymentFailed />}
          />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;