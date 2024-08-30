import Image from "next/image";
import { cookies } from "next/headers";
import { ProfileData } from "@/app/lib/types";

async function fetchProfileData(
  name: string,
  token: string
): Promise<ProfileData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}holidaze/profiles/${name}?_bookings=true&_venues=true`;
  console.log("Fetching profile data from URL:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch:", res.status, res.statusText);
    throw new Error("Failed to fetch profile data");
  }

  const result = await res.json();
  console.log("Profile data:", result); // Log to verify structure

  return result.data; // Return only the data part
}

export default async function ProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  if (!name) {
    return <div>Error: Profile name is undefined. Please check the URL.</div>;
  }

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.error("Access token not found.");
    return <div>Error: Access token not found. Please log in again.</div>;
  }

  console.log("Using access token:", token);

  try {
    const profileData = await fetchProfileData(name, token);

    if (!profileData) {
      return <div>Error: Failed to load profile data.</div>;
    }

    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center">
          {profileData.avatar ? (
            <Image
              src={profileData.avatar.url}
              alt={profileData.avatar.alt || "User Avatar"}
              width={150}
              height={150}
              className="rounded-full"
            />
          ) : (
            <div className="w-[150px] h-[150px] rounded-full bg-gray-300 flex items-center justify-center">
              No Avatar
            </div>
          )}
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p>{profileData.email}</p>
            {profileData.bio && <p>{profileData.bio}</p>}
          </div>
        </div>

        {profileData.banner && (
          <div className="mt-6">
            <Image
              src={profileData.banner.url}
              alt={profileData.banner.alt || "Banner"}
              width={1080}
              height={300}
              className="rounded"
            />
          </div>
        )}

        <div className="mt-6">
          <button className="mr-4 p-2 bg-blue-500 text-white rounded">
            My Bookings
          </button>
          <button className="mr-4 p-2 bg-gray-300 rounded">My Venues</button>
          <button className="p-2 bg-gray-300 rounded">Settings</button>
        </div>

        <div className="mt-6">
          {profileData.bookings && profileData.bookings.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold mb-4">My Bookings</h2>
              {profileData.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div>
                    {booking.venue?.media?.[0]?.url ? (
                      <Image
                        src={booking.venue.media[0].url}
                        alt={booking.venue.media[0].alt || "Venue image"}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-300 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">
                      {booking.venue.name}
                    </h3>
                    <p>
                      Location: {booking.venue.location.city},{" "}
                      {booking.venue.location.country}
                    </p>
                    <p>
                      Date: {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p>Guests: {booking.guests}</p>
                  </div>
                  <div>
                    <button className="mr-4 p-2 bg-blue-500 text-white rounded">
                      View Booking
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>

        {profileData.venueManager &&
          profileData.venues &&
          profileData.venues.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">My Venues</h2>
              {profileData.venues.map((venue) => (
                <div
                  key={venue.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div>
                    {venue.media?.[0]?.url ? (
                      <Image
                        src={venue.media[0].url}
                        alt={venue.media[0].alt || "Venue image"}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-300 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{venue.name}</h3>
                    <p>
                      Location: {venue.location.city}, {venue.location.country}
                    </p>
                    <p>Price: ${venue.price}/night</p>
                    <p>Guests: {venue.maxGuests}</p>
                  </div>
                  <div>
                    <button className="mr-4 p-2 bg-blue-500 text-white rounded">
                      View Venue
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded">
                      Delete Venue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching profile data:", error.message);
    return <div>Error: {error.message}</div>;
  }
}
