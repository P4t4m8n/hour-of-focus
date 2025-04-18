"use client";
//UI
import ItemsScroll from "@/components/UI/ItemsScroll";
//Components
import TestimonyItem from "./TestimonyItem";
//Types
import { TTestimony } from "@/types/testimonies.type";

interface TestimoniesProps {
  testimonies: TTestimony[];
}

export default function Testimonies({ testimonies }: TestimoniesProps) {
  return (
    <div className="lg:px-sides-sm md:px-sides px-sides text-center w-full order-5">
      <h4 className="pb-gaps text-24 lg:text-36">מה התלמידים שלנו מספרים?</h4>
      <ItemsScroll
        items={testimonies}
        renderItem={(testimony) => <TestimonyItem testimony={testimony} />}
      />
    </div>
  );
}
