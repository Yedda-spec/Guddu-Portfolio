import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutCard from "./components/AboutCard";
import Projects from "./components/Projects";
import CraftGallery from "./components/CraftGallery";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Nav />
      <FloatingContact />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <AboutCard />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="craft">
        <CraftGallery />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <Footer />
    </div>
  );
}
