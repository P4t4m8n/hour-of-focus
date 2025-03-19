"use client";
//React
import { useActionState, useRef } from "react";
//Actions
import { createTestimony, updateTestimony } from "@/lib/actions/testimonies";
//Types
import { TFormState } from "@/types/app.type";
import { TTestimonyDto } from "@/types/testimonies.type";
//Components
import AdminTestimoniesInputs from "./AdminTestimoniesInputs";
//UI
import Button from "@/components/UI/Button";
//Quill
import Quill from "quill";

interface AdminTestimoniesEditProps {
  testimonyToEdit: TTestimonyDto;
}

const initialState: TFormState<TTestimonyDto> = {
  errors: null,
  message: "",
  data: {
    delta: [],
  },
};
/**
 * AdminTestimoniesEdit client component allows editing or creating a testimony.
 * It uses a form to capture the testimony details and a Quill editor for rich text input.
 *
 * @param {AdminTestimoniesEditProps} props - The properties for the component.
 * @param {Testimony} props.testimonyToEdit - The testimony data to edit. If not provided, a new testimony will be created.
 *
 * @returns {JSX.Element} The rendered AdminTestimoniesEdit component.
 */
export default function AdminTestimoniesEdit({
  testimonyToEdit,
}: AdminTestimoniesEditProps) {
  const [state, fromAction, isPending] = useActionState(
    testimonyToEdit?._id ? updateTestimony : createTestimony,
    { ...initialState, data: testimonyToEdit }
  );
  const quillRef = useRef<Quill | null>(null);

  const handleSubmit = async (e: FormData) => {
    if (!quillRef.current) return;

    const delta = quillRef.current.getContents();
    e.append("quillOps", JSON.stringify(delta.ops));

    fromAction(e);
  };

  return (
    <form
      action={handleSubmit}
      className="p-4 border rounded flex flex-col gap-2 h-full bg-mainWhite-50 w-96 edit-form"
    >
      <AdminTestimoniesInputs
        quillRef={quillRef}
        data={state.data}
        errors={state?.errors}
      />
      <Button
        disabled={isPending}
        type="submit"
        styleMode="full"
        styleSize="large"
        className="self-center"
      >
        שמור
      </Button>
    </form>
  );
}
