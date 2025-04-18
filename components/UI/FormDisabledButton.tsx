"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";

interface FormDisabledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
/**
 * A button component that is disabled when a form is in a pending state.
 *
 * @component
 * @param {FormDisabledButtonProps} props - The properties passed to the button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @returns {JSX.Element} The rendered button component.
 * </FormDisabledButton>
 */
export default function FormDisabledButton({
  children,
  ...props
}: FormDisabledButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      styleMode="none"
      styleSize="none"
      className={`bg-inherit border-2  w-20  border-mainGray-700 text-mainGray-700 hover:shadow-mainGray-800 hover:text-mainGray-800 rounded-base flex  justify-center items-center font-semibold hover:cursor-pointer ${
        pending ? "opacity-50" : ""
      }`}
    >
      {children}
    </Button>
  );
}
