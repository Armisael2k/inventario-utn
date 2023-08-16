import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const particlesOptions = {
  fpsLimit: 120,
  particles: {
    color: "#43a047",
    number: {
      value: 150,
      density: {
        enable: false
      }
    },
    size: {
      value: { min: 1, max: 5 }
    },
    opacity: {
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.1
      }
    },
    move: {
      enable: true,
      direction: "top",
      outModes: "out",
      speed: 1
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      }
    },
    modes: {
      bubble: {
        distance: 200,
        duration: 2,
        size: 0,
        opacity: 0
      }
    }
  }
}

function BackgroundParticles (...props) {
  const particlesInit = useCallback(async engine => await loadFull(engine), []);

  return (
    <Particles
      options={particlesOptions}
      init={particlesInit}
      {...props}
    />
  );
}

export default BackgroundParticles;