export default function ShindanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-4xl text-blue-500 mb-4">♠ ♥ ♣ ♦</p>
      <h2 className="text-lg font-bold tracking-[2px] text-blue-900 mb-3">
        COMING SOON
      </h2>
      <p className="text-sm text-text-muted mb-6">
        あなたのポーカー適性を診断します。
      </p>
      <div className="border border-blue-100 bg-blue-50 rounded-lg p-4 text-xs text-text-secondary leading-relaxed max-w-xs">
        5〜10問の質問に答えて
        <br />
        プレイスタイルを分析 / 結果をSNSでシェア可能
      </div>
    </div>
  );
}
