export default function HeroBanner() {
  return (
    <section className="bg-blue-900 text-white px-6 py-10 text-center relative">
      <p className="text-xs tracking-[4px] text-white/70 mb-2">
        2026.04.24 – 05.06
      </p>
      <h2 className="text-2xl font-bold mb-1">GRAND FINAL</h2>
      <p className="text-xs text-white/60 mb-1">Japan Open Poker Tour</p>
      <p className="text-[10px] text-white/50 mb-4 leading-relaxed">
        ベルサール高田馬場 / Bellesalle Takadanobaba, Shinjuku, Tokyo
      </p>
      <p className="text-sm italic text-white/85">
        すべてのポーカーに、白熱を。
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-500 to-transparent" />
    </section>
  );
}
