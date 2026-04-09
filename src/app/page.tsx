import HeroBanner from "@/components/HeroBanner";
import PromoCarousel from "@/components/PromoCarousel";
import VenueAccess from "@/components/VenueAccess";
import YouTubeLink from "@/components/YouTubeLink";
import FollowButtons from "@/components/FollowButtons";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="px-4 py-6 space-y-6">
        <PromoCarousel />
        <YouTubeLink />
        <VenueAccess />
        <FollowButtons />
      </div>
    </div>
  );
}
