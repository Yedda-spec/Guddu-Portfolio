import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutCard from "./components/AboutCard";
import CraftGallery from "./components/CraftGallery";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import FloatingContact from "./components/FloatingContact";
import ProjectDetail from "./components/ProjectDetail";

function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <AboutCard />
      </section>
      <section id="craft">
        <CraftGallery />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-white text-black min-h-screen">
        <Nav />
        <FloatingContact />
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/craft/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
