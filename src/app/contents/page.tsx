const GTO_URL =
  process.env.NEXT_PUBLIC_GTO_URL ?? "https://gto-challenge.vercel.app";

export const metadata = {
  title: "CHALLENGE — JOPT 2026 Grand Final",
  description:
    "GTO Challenge — 3分間のタイムアタック型ポーカーGTOクイズ。あなたのポーカーIQを証明せよ。",
};

export default function ContentsPage() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-[67px] bottom-[57px] w-full max-w-[430px] z-0 bg-bg-primary">
      <iframe
        src={GTO_URL}
        title="GTO Challenge"
        className="w-full h-full border-0 block"
        allow="fullscreen; autoplay; encrypted-media; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
