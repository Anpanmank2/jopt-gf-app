"use client";

import { useEffect, useState } from "react";

export default function LineOverlay() {
  const [isLine, setIsLine] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && /Line/i.test(navigator.userAgent)) {
      setIsLine(true);
    }
  }, []);

  if (!isLine) return null;

  const openExternal = () => {
    window.location.href = window.location.href;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-8 text-center">
      <p className="text-lg font-bold text-blue-900 mb-4">
        外部ブラウザで開いてください
      </p>
      <p className="text-sm text-text-secondary mb-6">
        LINEブラウザではPWA機能が制限されます。
        <br />
        Safari/Chromeで開いてご利用ください。
      </p>
      <button
        onClick={openExternal}
        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium text-sm"
      >
        Safari / Chrome で開く
      </button>
    </div>
  );
}
