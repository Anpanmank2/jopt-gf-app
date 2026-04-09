import HeroBanner from "@/components/HeroBanner";
import YouTubeLink from "@/components/YouTubeLink";
import SponsorGrid from "@/components/SponsorGrid";
import FollowButtons from "@/components/FollowButtons";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="px-4 py-6 space-y-6">
        <YouTubeLink />
        <SponsorGrid />
        <FollowButtons />
      </div>
    </div>
  );
}
