import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProjectsPage from "./pages/Projects";
import SkillsPage from "./pages/Skills";
import ContactPage from "./pages/Contact";
import Admin from "./components/Admin";
import ResumePage from "./pages/Resume";
import CertificationsPage from "./pages/Certifications";
import IntroOverlay from "./components/IntroOverlay";
import LivingBackground from "./components/LivingBackground";
import Silhouette from "./components/Silhouette";

function App() {
  return (
    <>
      <LivingBackground />
      <Silhouette />
      <IntroOverlay />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/skills" element={<Layout><SkillsPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/resume" element={<Layout><ResumePage /></Layout>} />
          <Route path="/certifications" element={<Layout><CertificationsPage /></Layout>} />
        </Routes>
      </div>
    </>
  );
}

export default App;