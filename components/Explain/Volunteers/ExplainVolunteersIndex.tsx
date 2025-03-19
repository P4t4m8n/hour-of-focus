import ExplainVolunteersInfo from "./ExplainVolunteersInfo";
import ExplainVolunteersMiddle from "./ExplainVolunteersMiddle";
import VolunteersJoinCmp from "@/components/UI/VolunteersJoinCmp";
import HeroCmp from "@/components/UI/HeroCmp";

export default function ExplainVolunteersIndex() {
  return (
    <section className="flex flex-col gap-gaps md:gap-gaps-md pb-gaps md:pb-gaps-md">
      <HeroCmp text="הסבר למתנדבים" />
      <ExplainVolunteersInfo />
      <ExplainVolunteersMiddle />
      <VolunteersJoinCmp />
    </section>
  );
}
