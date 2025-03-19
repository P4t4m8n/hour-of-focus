/**
 * Custom hook to handle horizontal scrolling of a list.
 *
 * @param ref - A React ref object pointing to a HTMLUListElement or null.
 * @returns A tuple containing a function to scroll the list by a specified number of items.
 *
 * The returned function takes a single argument:
 * - `dir` (number): The direction and number of items to scroll. Positive values scroll to the right, negative values scroll to the left.
 *
 * The function will scroll the list smoothly by the width of one item multiplied by the `dir` value.
 * If the list is scrolled to the start, it will jump to the end of the list before performing the scroll.
 */
export const useScroll = (
  ref: React.RefObject<HTMLUListElement | null> | null
): [(dir: number) => void] => {
  const onScrollBy = (dir: number) => {
    if (!ref || !ref.current) return;

    const list = ref.current;
    const item = list.children[0] as HTMLElement;
    const itemWidth = item?.offsetWidth || 0;

    if (list.scrollLeft <= 0) {
      list.scrollLeft = list.scrollWidth;
    }

    list.scrollBy({
      left: itemWidth * dir,
      behavior: "smooth",
    });
  };

  return [onScrollBy];
};
