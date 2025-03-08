//UI
import HeroCmp from "@/components/UI/HeroCmp";
import VolunteersJoinCmp from "@/components/UI/VolunteersJoinCmp";
//Components
import ExplainVolunteersInfo from "./ExplainStudentsInfo";
import ExplainStudentsMiddle from "./ExplainStudentsMiddle";
import ExplainIdeas from "./ExplainIdeas";

export default function ExplainStudentsIndex() {
  return (
    <section className="flex flex-col h-fit pb-32 mobile:pb-16">
      <HeroCmp text="הסבר לתלמידים" />
      <ExplainStudentsMiddle />
      <ExplainVolunteersInfo />
      <ExplainIdeas />
      <VolunteersJoinCmp />
    </section>
  );
}
