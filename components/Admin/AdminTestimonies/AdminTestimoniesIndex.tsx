//Types
import { TTestimony } from "@/types/testimonies.type";
//Components
import HandleEdit from "../HandleEdit";
import AdminTestimoniesEdit from "./AdminTestimoniesEdit";
import AdminTestimoniesPreview from "./AdminTestimoniesPreview";
//Utils
import { TestimoniesServerUtils } from "@/utils/server/testimonies.util";
//UI
import ItemList from "@/components/UI/ItemList";

interface AdminArticlesIndexProps {
  testimonies: TTestimony[];
}
/**
 * AdminTestimoniesIndex server component renders a section containing a list of testimonies with an edit option.
 *
 * @component
 * @param {AdminArticlesIndexProps} props - The props for the component.
 * @param {Array} props.testimonies - An array of testimonies items to be displayed.
 *
 * @returns {JSX.Element} The rendered AdminTestimoniesIndex component.
 */
export default function AdminTestimoniesIndex({
  testimonies,
}: AdminArticlesIndexProps) {
  return (
    <section className="p-2 rounded min-w-full h-fit pb-24">
      <div className="flex justify-between items-center pb-8">
        <h3 className="">המלצות</h3>
        <HandleEdit
          item={TestimoniesServerUtils.getEmpty()}
          EditCmp={({ item }) => (
            <AdminTestimoniesEdit testimonyToEdit={item} />
          )}
        />
      </div>
      <ItemList
        listStyle=" flex flex-wrap justify-around gap-6 w-full"
        items={testimonies}
        renderItem={(item) => <AdminTestimoniesPreview testimony={item} />}
      />
    </section>
  );
}
