import { useState, useEffect, useCallback } from "react";
import "./IntroOverlay.css";

const SESSION_KEY = "portfolio_intro_seen";
const DURATION = 5000;

export default function IntroOverlay() {
    const [visible, setVisible] = useState(
        () => !sessionStorage.getItem(SESSION_KEY)
    );

    const dismiss = useCallback(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(false);
    }, []);

    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(dismiss, DURATION);
        return () => clearTimeout(t);
    }, [visible, dismiss]);

    useEffect(() => {
        if (!visible) return;
        const onKey = (e) => { if (e.key === "Escape") dismiss(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [visible, dismiss]);

    if (!visible) return null;

    // Generate 150 random mini slashes for Malevolent Shrine barrage
    const miniSlashes = Array.from({ length: 150 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = -10 + Math.random() * 100; // Let them start slightly offscreen too
        const width = 10 + Math.random() * 50; // 10vw to 60vw long
        const angle = -80 + Math.random() * 160; // -80deg to 80deg
        const delay = Math.random() * 2.5; // 0s to 2.5s continuous barrage
        const duration = 0.05 + Math.random() * 0.15; // 0.05s to 0.2s (much faster, blink and miss)


        return (
            <div
                key={`mini-${i}`}
                className="mini-slash"
                style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${width}vw`,
                    "--rot": `rotate(${angle}deg)`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}
            />
        );
    });

    return (
        <div
            className="intro-overlay"
            onClick={dismiss}
            role="dialog"
            aria-modal="true"
            aria-label="Intro animation"
        >
            {/* SVG Filter to perfectly isolate lines and tint them neon red */}
            <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                <filter id="sukunaRedFilter">
                    {/* Extract luminance to Alpha so black becomes transparent */}
                    <feColorMatrix type="matrix" values="
                        0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                    " />
                    {/* Boost contrast: blacks disappear completely, neon lines turn opaque */}
                    <feComponentTransfer>
                        <feFuncR type="linear" slope="2.5" intercept="-0.3" />
                        <feFuncG type="linear" slope="2.5" intercept="-0.3" />
                        <feFuncB type="linear" slope="2.5" intercept="-0.3" />
                        <feFuncA type="linear" slope="2.5" intercept="-0.3" />
                    </feComponentTransfer>
                    {/* Tint to pure neon red matching the theme (#dc143c / #ff0000) */}
                    <feColorMatrix type="matrix" values="
                        1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0
                    " />
                </filter>
            </svg>

            {/* ── Black background rip-halves (z:3) ── */}
            <div className="rip-half rip-left" aria-hidden="true" />
            <div className="rip-half rip-right" aria-hidden="true" />

            {/* ── Demon image (static center, z:5) ── */}
            <div className="demon-wrap" aria-hidden="true">
                <img
                    src="/sukuna.jpg"
                    alt=""
                    className="demon-img sukuna-trace"
                    draggable="false"
                />
            </div>

            {/* ── Random scattered mini-slashes (z:6) ── */}
            <div className="mini-slash-layer" aria-hidden="true">
                {miniSlashes}
            </div>

            {/* ── Massive Malevolent Shrine slash marks (z:6) ── */}
            <div className="slash-layer" aria-hidden="true">
                <div className="slash sl-1" />
                <div className="slash sl-2" />
                <div className="slash sl-3" />
                <div className="slash sl-4" />
                <div className="slash sl-5" />
                <div className="slash sl-6" />
                <div className="slash sl-7" />
            </div>

            {/* ── Red seam at tear line (z:6) ── */}
            <div className="rip-seam" aria-hidden="true" />

            {/* Skip */}
            <button
                className="intro-skip"
                onClick={(e) => { e.stopPropagation(); dismiss(); }}
                aria-label="Skip intro"
            >
                SKIP →
            </button>
        </div>
    );
}
