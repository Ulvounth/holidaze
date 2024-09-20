import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VenueForm from "../components/venue/VenueForm";

export default function CreateVenuePage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user?.venueManager) {
    redirect("/unauthorized"); // Redirect if the user is not a venue manager
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Venue</h1>
      <VenueForm />
    </div>
  );
}
