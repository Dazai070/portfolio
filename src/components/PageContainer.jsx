/**
 * PageContainer — reusable centered page wrapper.
 * Uses the global .section-container from index.css for consistent
 * max-width (1000px), horizontal padding (24px), and centering.
 */
export default function PageContainer({ children }) {
    return (
        <section className="page-enter" style={{
            minHeight: "100vh",
            padding: "5rem 0 4rem",
            color: "#e0e0e0",
            fontFamily: "'Inter','Segoe UI',sans-serif",
        }}>
            <div className="section-container">
                {children}
            </div>
        </section>
    );
}

