import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Sentinel from "./components/Sentinel";
import Pipeline from "./components/Pipeline";
import Projects from "./components/Projects";
import Detections from "./components/Detections";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink-950 font-sans text-slate-400">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Sentinel />
        <Pipeline />
        <Projects />
        <Detections />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
