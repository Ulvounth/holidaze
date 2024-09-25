import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VenueForm from "../components/venue/VenueForm";

export default function CreateVenuePage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user?.venueManager) {
    redirect("/unauthorized");
  }

  return (
    <div className="container mx-auto py-6 border-t-2">
      <VenueForm />
    </div>
  );
}
