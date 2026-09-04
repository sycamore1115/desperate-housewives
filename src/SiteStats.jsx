import { useEffect } from "react";

function SiteStats() {
  useEffect(() => {
    const existing = document.getElementById("busuanzi-script");
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.id = "busuanzi-script";
    script.async = true;
    script.src = `//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js?t=${Date.now()}`;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="site-stats">
      本站总访客数 <span id="busuanzi_value_site_uv">-</span> 人
    </div>
  );
}

export default SiteStats;
