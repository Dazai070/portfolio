import { useEffect, useState } from "react";
import { getCertifications } from "../services/certificationsService";
import PageContainer from "../components/PageContainer";

export default function CertificationsPage() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCertifications().then((data) => { setCerts(data); setLoading(false); });
    }, []);

    return (
        <PageContainer>
            <h2 style={{ color: "#ff1e1e", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: 700 }}>
                Certifications
            </h2>
            <p style={{ color: "#555", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
                Verified credentials &amp; achievements
            </p>

            {loading && <p style={{ color: "#555" }}>Loading…</p>}
            {!loading && certs.length === 0 && (
                <p style={{ color: "#555" }}>No certifications added yet.</p>
            )}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
            }}>
                {certs.map((cert) => (
                    <div key={cert.id} style={{
                        background: "#0f0f0f",
                        border: "1px solid #1f1f1f",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        transition: "border-color 0.2s",
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = "#ff1e1e44"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1f1f1f"}
                    >
                        {/* Badge icon */}
                        <div style={{
                            width: "36px", height: "36px", borderRadius: "8px",
                            background: "#ff1e1e18", display: "flex", alignItems: "center",
                            justifyContent: "center", marginBottom: "0.25rem",
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                            </svg>
                        </div>

                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "#e0e0e0", lineHeight: 1.3 }}>
                            {cert.title}
                        </div>
                        <div style={{ fontSize: "0.83rem", color: "#888" }}>
                            {cert.issuer}
                            {cert.year && <span style={{ color: "#555", marginLeft: "0.4rem" }}>· {cert.year}</span>}
                        </div>

                        {cert.fileURL && (
                            <a
                                href={cert.fileURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginTop: "0.75rem",
                                    display: "inline-block",
                                    padding: "0.4rem 0.9rem",
                                    background: "transparent",
                                    color: "#ff1e1e",
                                    border: "1px solid #ff1e1e55",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: "0.82rem",
                                    letterSpacing: "0.3px",
                                    alignSelf: "flex-start",
                                    transition: "background 0.2s, border-color 0.2s",
                                }}
                                onMouseEnter={(e) => { e.target.style.background = "#ff1e1e18"; e.target.style.borderColor = "#ff1e1e"; }}
                                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "#ff1e1e55"; }}
                            >
                                View Certificate ↗
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}

