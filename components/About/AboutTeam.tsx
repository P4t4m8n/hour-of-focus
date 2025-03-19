import { TEAM_ONE_IMAGE, TEAM_TWO_IMAGE } from "@/constants/images";
import Image from "next/image";
import React from "react";

export default function AboutTeam() {
  return (
    <div className="bg-mainWhite-50 grid justify-items-center py-12 gap-10 w-full">
      <h4>{`צוות 'שעה של פוקוס'`}</h4>
      <ul className="flex gap-gaps">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col justify-center items-center gap-4"
          >
            <Image
              width={136}
              height={136}
              src={item.src}
              alt="avatar"
              className="rounded-full"
            />
            <p className="text-18 text-mainGray-800 leading-30">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const items = [
  {
    src: TEAM_TWO_IMAGE,
    name: "שלו שריקי",
  },
  {
    src: TEAM_ONE_IMAGE,
    name: "אהד תשובה",
  },
];
