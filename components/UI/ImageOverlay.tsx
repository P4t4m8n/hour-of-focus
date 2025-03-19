/**
 * ImageOverlay component that wraps its children with an overlay effect.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered ImageOverlay component.
 *
 * @example
 * ```tsx
 * <ImageOverlay>
 *   <img src="example.jpg" alt="Example" />
 * </ImageOverlay>
 * ```
 */
export default function ImageOverlay({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { children } = props;
  const style = `absolute inset-0 bg-imageOverlay-60`;
  return (
    <div
      {...props}
      className="relative grid-stack w-full h-full overflow-hidden"
    >
      {children}
      <div className={style}></div>
    </div>
  );
}
