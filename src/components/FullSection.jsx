/**
 * FullSection — full-viewport-height layout shell for Home page sections.
 * Each section fills 100vh, centers its content, and constrains to the
 * global .section-container (1000px max-width, 24px gutters).
 */
export default function FullSection({ id, children, style = {} }) {
    return (
        <section
            id={id}
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "6rem 0 4rem",
                ...style,
            }}
        >
            <div className="section-container">
                {children}
            </div>
        </section>
    );
}

