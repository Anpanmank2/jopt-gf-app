export default function YouTubeLink() {
  return (
    <section>
      <h3 className="text-xs font-bold tracking-[2px] text-blue-900 uppercase mb-3">
        JOPT OFFICIAL YOUTUBE
      </h3>
      <a
        href="https://youtube.com/@japanopenpokertour"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-3 border border-border-default rounded-lg hover:bg-bg-secondary transition-colors"
      >
        <div className="w-[30px] h-[30px] bg-blue-700 rounded-md flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            JOPT 公式 YouTube チャンネル
          </p>
          <p className="text-xs text-text-muted truncate">
            配信アーカイブ・スペシャルムービー
          </p>
        </div>
      </a>
    </section>
  );
}
