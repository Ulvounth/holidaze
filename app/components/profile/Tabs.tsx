"use client";

import { useState } from "react";
import MyBookings from "../booking/MyBookings";
import MyVenues from "../venue/MyVenues"; // Server-side component for rendering venues
import Settings from "./Settings";
import { ProfileData, Booking, Venue } from "@/app/lib/types";

export default function Tabs({
  profileData,
  bookings,
  venues,
}: {
  profileData: ProfileData;
  bookings: Booking[];
  venues: Venue[];
}) {
  const [activeTab, setActiveTab] = useState<
    "bookings" | "venues" | "settings"
  >("bookings");

  return (
    <div className="mt-8">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`p-3 text-lg rounded-lg ${
            activeTab === "bookings"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          My Bookings
        </button>
        {profileData.venueManager && (
          <button
            onClick={() => setActiveTab("venues")}
            className={`p-3 text-lg rounded-lg ${
              activeTab === "venues"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            My Venues
          </button>
        )}
        <button
          onClick={() => setActiveTab("settings")}
          className={`p-3 text-lg rounded-lg ${
            activeTab === "settings"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Edit Profile
        </button>
      </div>

      <div>
        {activeTab === "bookings" && <MyBookings bookings={bookings} />}
        {activeTab === "venues" && profileData.venueManager && (
          <MyVenues venues={venues} />
        )}
        {activeTab === "settings" && <Settings profile={profileData} />}
      </div>
    </div>
  );
}
