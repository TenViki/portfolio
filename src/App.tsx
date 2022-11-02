import Hero from "./sections/hero/Hero";
import AboutMe from "./sections/aboutme/AmoutMe";
import Wave from "./assets/Wave";
import WaveDark from "./assets/WaveDark";

function App() {
  return (
    <div className="app">
      <Hero />
      <div className="waves">
        <Wave/>
        <WaveDark />
      </div>

      <div className="background">
        <AboutMe />
      </div>
    </div>
  );
}

export default App;
