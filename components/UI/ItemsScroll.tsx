"use client";

//React
import { useState } from "react";
//UI
import Button from "./Button";
import { DirectionSvg } from "./icons/Icons";

interface ItemsScrollProps<T> {
  items: T[];
  renderItem: (item: T, isFading: boolean) => React.ReactNode;
}
/**
 * A generic component that renders a scrollable list of items with fade transition effect.
 *
 * @template T - The type of the items in the list.
 *
 * @param {ItemsScrollProps<T>} props - The props for the component.
 * @param {T[]} props.items - The array of items to be rendered.
 * @param {(item: T, isFading: boolean) => React.ReactNode} props.renderItem - A function that renders an item.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function ItemsScroll<T>({
  items,
  renderItem,
}: ItemsScrollProps<T>) {
  const [currentItem, setCurrentItem] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const onClick = (index: number) => {
    setIsFading(true);

    setTimeout(() => {
      setCurrentItem((prev) => {
        const idx = prev + index;
        if (idx < 0) return items.length - 1;
        if (idx > items.length - 1) return 0;
        return prev + index;
      });

      setIsFading(false);
    }, 300);
  };

  return (
    <div className="flex items-center justify-between text-center gap-4 w-full">
      <Button onClick={() => onClick(-1)} aria-label="previous item">
        <DirectionSvg className="-rotate-90 h-10 w-10 md:h-16 md:w-16 bg-inherit" />
      </Button>

      <div
        className={`transition-opacity duration-300 w-full justify-center flex ' ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {renderItem(items[currentItem], isFading)}
      </div>

      <Button onClick={() => onClick(1)} aria-label="next item">
        <DirectionSvg className="rotate-90 h-10 w-10 md:h-16 md:w-16 bg-inherit" />
      </Button>
    </div>
  );
}
