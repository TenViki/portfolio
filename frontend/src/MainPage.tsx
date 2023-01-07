import Hero from "./sections/hero/Hero";
import AboutMe from "./sections/aboutme/AboutMe";
import Wave from "./assets/Wave";
import WaveDark from "./assets/WaveDark";
import GoogleLogin from "./components/GoogleLogin/GoogleLogin";

function App() {
  return (
    <div className="app">
      <Hero />

      <div className="background">
        <AboutMe />
        <div style={{ height: "100vh" }}>
          <div id="google-login">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
