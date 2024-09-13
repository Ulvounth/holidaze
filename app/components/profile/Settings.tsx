import ProfileForm from "./ProfileForm";
import { ProfileData } from "@/app/lib/types";

export default function Settings({ profile }: { profile: ProfileData }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <ProfileForm
        name={profile.name}
        currentAvatarUrl={profile.avatar?.url || "/default-avatar.png"}
        currentBio={profile.bio || ""}
        currentBannerUrl={profile.banner?.url || "/default-banner.png"} // Pass banner URL
      />
    </div>
  );
}
