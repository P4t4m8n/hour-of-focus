import VolunteersJoinCmp from "../UI/VolunteersJoinCmp";
import AboutHero from "./AboutHero";
import AboutInfo from "./AboutInfo/AboutInfo";
import AboutJoinUs from "./AboutJoinUs";
import AboutOurStory from "./AboutOurStory";
import AboutTeam from "./AboutTeam";

export default function AboutIndex() {
  return (
    <div className="flex flex-col gap-gaps md:gap-gaps-md w-full justify-center items-center pb-gaps">
      <AboutHero />
      <AboutOurStory />
      <AboutTeam />
      <AboutInfo />
      <AboutJoinUs />
      <VolunteersJoinCmp />
    </div>
  );
}
