import { Fragment } from "react";

interface Props<T extends { _id?: string | undefined }> {
  items: T[];
  renderItem: (item: T, idx?: number) => React.ReactNode;
  listStyle?: string;
}
/**
 * A generic component that renders a list of items.
 *
 * @template T - The type of the items in the list. Must have an optional `_id` property.
 *
 * @param {T[]} items - The array of items to render.
 * @param {(item: T, index: number) => React.ReactNode} renderItem - A function that renders an item.
 * @param {string} listStyle - The CSS class name to apply to the list.
 *
 * @returns {JSX.Element} The rendered list of items.
 */
export default function ItemList<T extends { _id?: string }>({
  items,
  renderItem,
  listStyle,
}: Props<T>) {
  return (
    <ul className={listStyle}>
      {items.map((item, index) => (
        <Fragment key={item?._id || index}>{renderItem(item, index)}</Fragment>
      ))}
    </ul>
  );
}



//grid grid-cols-[repeat(auto-fill,minmax(10rem,min(100%,23rem)))] gap-gaps w-full  px-sides lg:px-sides-sm  