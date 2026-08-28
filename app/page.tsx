import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import GAPageView from "./components/GAPageView"
import Hero from "./sections/Hero"
import Manifesto from "./sections/Manifesto"
import GapFigure from "./sections/GapFigure"
import BrainFigure from "./sections/BrainFigure"
import Modules from "./sections/Modules"
import Readout from "./sections/Readout"
import Deployment from "./sections/Deployment"
import Industries from "./sections/Industries"
import Proof from "./sections/Proof"
import Closing from "./sections/Closing"

/**
 * Landing page spine.
 *
 * Paper carries the whole page except two ink moments — the hero and Fig. 2 —
 * so the argument lands where the surface changes:
 *
 *   thesis → problem (Fig. 1) → answer (Fig. 2) → system → proof → invitation
 */
export default function Home() {
  return (
    <>
      <GAPageView />
      <main>
        <NavBar />
        <Hero />
        <Manifesto />
        <GapFigure />
        <BrainFigure />
        <Modules />
        <Readout />
        <Deployment />
        <Industries />
        <Proof />
        <Closing />
        <Footer />
      </main>
    </>
  )
}
