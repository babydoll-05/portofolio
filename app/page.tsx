import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects3D from './components/sections/Projects3D';
import Contact from './components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects3D />
      <Contact />
    </main>
  );
}
