"use client";
//React
import React, { JSX, RefObject } from "react";
//Next
import dynamic from "next/dynamic";
//Quill
import Quill from "quill";
//force dynamic import of Quill editor to avoid server-side rendering
const RichTextEditor = dynamic(
  () => import("@/components/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
//UI
import ErrorLabel from "@/components/UI/ErrorLabel";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
//Types
import { TValidationError } from "@/types/app.type";
import { TFaq } from "@/types/faqs";

interface AdminFaqEditInputsProps {
  isStudents: boolean;
  deltaAnswerRef: RefObject<Quill | null>;
  deltaQuestionRef: RefObject<Quill | null>;
  errors?: TValidationError<Omit<TFaq, "createAt">> | null;
  data?: Omit<TFaq, "createAt"> | undefined;
}
/**
 * AdminFaqEditInputs client component renders the input fields for editing a FAQ entry.
 *
 * @component
 * @param {AdminFaqEditInputsProps} props - The props for the component.
 * @param {boolean} props.isStudents - A boolean value indicating whether the FAQ entry is for students.
 * @param {RefObject} props.deltaAnswerRef - A reference to the Quill editor for the answer field.
 * @param {RefObject} props.deltaQuestionRef - A reference to the Quill editor for the question field.
 * @param {TValidationError} props.errors - An object containing validation errors for the FAQ entry.
 * @param {TFaq} props.data - The FAQ entry to edit.
 *
 * @returns {JSX.Element} The rendered AdminFaqEditInputs component.
 */
export default function AdminFaqEditInputs({
  isStudents,
  errors,
  deltaAnswerRef,
  deltaQuestionRef,
  data,
}: AdminFaqEditInputsProps): JSX.Element {
  return (
    <>
      <div className="flex">
        <Input
          type="radio"
          id="students-radio"
          name="faqType"
          defaultValue="students"
          defaultChecked={isStudents}
          divStyle="flex items-center gap-2 w-full"
          className="h-full"
        >
          <Label htmlFor="students-radio">תלמידים</Label>
        </Input>
        <Input
          type="radio"
          id="volunteers-radio"
          name="faqType"
          defaultValue="volunteers"
          defaultChecked={!isStudents}
          divStyle="flex items-center gap-2 w-full"
          className="h-full"
        >
          <Label htmlFor="volunteers-radio">מתנדבים</Label>
        </Input>
      </div>
      <div>
        <Label className="text-18" htmlFor="deltaAnswer">
          שאלה
        </Label>
        <ErrorLabel htmlFor="deltaAnswer" error={errors?.deltaAnswer} />

        <RichTextEditor
          quillRef={deltaQuestionRef}
          delta={data?.deltaQuestion}
        />
      </div>
      <div>
        <Label className="text-18" htmlFor="deltaAnswer">
          תשובה
        </Label>
        <ErrorLabel htmlFor="deltaAnswer" error={errors?.deltaQuestion} />
        <RichTextEditor quillRef={deltaAnswerRef} delta={data?.deltaAnswer} />
      </div>
    </>
  );
}
