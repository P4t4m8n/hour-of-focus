//Components
import Testimonies from "@/components/Home/Testimonies/Testimonies";
//Actions
import { getTestimonies } from "@/lib/actions/testimonies";
/**
 * HomeTestimoniesPage server component fetches testimonies data and renders the Testimonies component.
 *
 * @async
 * @function HomeTestimoniesPage
 * @returns {Promise<JSX.Element>} A promise that resolves to the Testimonies component with fetched testimonies data.
 *
 * @component
 */

export default async function HomeTestimoniesPage() {
  const testimonies = await getTestimonies(false);
  return <Testimonies testimonies={testimonies} />;
}
