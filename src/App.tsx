import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import About from "./components/About";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import Portfolio from "./components/Portfolio";
import Start from "./components/Start";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/start" replace />} />
          <Route path="/start" element={<Start />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/omnie" element={<About />} />
          {/* <Route path="/kontakt" element={<Contact />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
