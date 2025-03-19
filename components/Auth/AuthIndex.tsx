import EmailForm from "./EmailForm";

export default function AuthIndex() {
  return (
    <section className="w-full min-h-[calc(80svh-5rem)] flex justify-center items-center mobile:px-4 transition-all duration-300">
      <div className="p-4 rounded-base border  border-mainOrange-700 w-full max-w-sm min-w-xs self-center flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold pb-2">כניסה</h1>
        </header>

        <EmailForm />
      </div>
    </section>
  );
}
