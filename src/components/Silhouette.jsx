import './Silhouette.css';

export default function Silhouette() {
    return (
        <div className="silhouette-container" aria-hidden="true">
            {/* SVG Filter to perfectly isolate lines and tint them neon red (Persistent after intro) */}
            <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                <filter id="sukunaRedFilterGlobal">
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
                    {/* Tint to pure neon red */}
                    <feColorMatrix type="matrix" values="
                        1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0
                    " />
                </filter>
            </svg>
            <img
                src="/sukuna.jpg"
                alt="Silhouette overlay"
                className="silhouette-image"
                draggable="false"
            />
        </div>
    );
}
