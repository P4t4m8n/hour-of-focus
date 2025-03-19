/**
 * HomeIndex component serves as separate components holder for the home page to different from the layout.
 * It composes the home page by including the HomeHero, WhoWeAre, and CallToAction components.
 *
 * @component
 * @return {jsx}
 */
//Components
import CallToAction from "./CallToAction";
import HomeHero from "./HomeHero/HomeHero";
import WhoWeAre from "./WhoWeAre";

export default function HomeIndex() {
  return (
    <>
      <HomeHero />
      <WhoWeAre />
      <CallToAction />
    </>
  );
}
