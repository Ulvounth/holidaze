import Image from "next/image";
import { cookies } from "next/headers";
import fetchProfileData from "@/app/lib/services/profile/fetchProfile";
import { fetchProfileVenues } from "@/app/lib/services/profile/fetchProfileVenues"; // Add this import
import Tabs from "@/app/components/profile/Tabs";

async function ProfilePage({ params }: { params: { name: string } }) {
  const { name } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return (
      <div className="text-red-500">
        Error: Access token not found. Please log in again.
      </div>
    );
  }

  // Fetch user profile data
  const profileData = await fetchProfileData(name, token);

  if (!profileData) {
    return (
      <div className="text-red-500">Error: Failed to load profile data.</div>
    );
  }

  // Fetch venues managed by this profile, along with the bookings made on those venues
  const venues = await fetchProfileVenues(name, token);

  return (
    <div className="relative w-full">
      {profileData.banner && (
        <div className="relative w-full h-64 md:h-80 bg-gray-200">
          <Image
            src={profileData.banner.url}
            alt={profileData.banner.alt || "Banner"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-[-75px] left-1/2 transform -translate-x-1/2">
            <Image
              src={profileData.avatar?.url || "/default-avatar.png"}
              alt={profileData.avatar?.alt || "User Avatar"}
              width={150}
              height={150}
              className="rounded-full border-4 border-white bg-white shadow-lg"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-28 pb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{profileData.name}</h1>
          <p className="text-gray-600">{profileData.email}</p>
          {profileData.bio && (
            <p className="mt-2 text-gray-700">{profileData.bio}</p>
          )}
        </div>

        {/* Show venues and bookings made on those venues */}
        <Tabs
          profileData={profileData}
          bookings={profileData.bookings || []}
          venues={venues} // Pass the fetched venues with bookings here
        />
      </div>
    </div>
  );
}

export default ProfilePage;
