export default function VenueAccess() {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        VENUE / ACCESS
      </h2>
      <div className="bg-blue-50 rounded-lg p-4 space-y-2">
        <p className="text-sm font-bold text-blue-900">
          ベルサール高田馬場
        </p>
        <p className="text-xs text-gray-500">
          Bellesalle Takadanobaba, Shinjuku, Tokyo
        </p>
        <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
          <p className="text-xs text-gray-500">
            [Map] 東京都新宿区大久保3-8-2
          </p>
          <p className="text-xs text-gray-500">
            [Train] JR / 東京メトロ 高田馬場駅 徒歩約7分
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=ベルサール高田馬場"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs text-blue-700 underline"
        >
          Google Maps で開く →
        </a>
      </div>
    </section>
  );
}
