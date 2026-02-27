import { useEffect, useState } from "react";
import { getResume } from "../services/resumeService";
import PageContainer from "../components/PageContainer";

export default function ResumePage() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResume().then((data) => { setEntries(data); setLoading(false); });
    }, []);

    return (
        <PageContainer maxWidth="700px">
            <h2 style={{ color: "#ff1e1e", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: 700 }}>Resume</h2>
            <p style={{ color: "#555", marginBottom: "2rem", fontSize: "0.9rem" }}>Download or view my latest resume</p>

            {loading && <p style={{ color: "#555" }}>Loading…</p>}
            {!loading && entries.length === 0 && (
                <p style={{ color: "#555" }}>No resume added yet.</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {entries.map((entry) => (
                    <div key={entry.id} style={{
                        background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "10px",
                        padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                        <span style={{ fontSize: "0.95rem" }}>{entry.fileName}</span>
                        <a
                            href={entry.fileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "0.45rem 1rem", background: "#ff1e1e", color: "#fff",
                                borderRadius: "6px", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem",
                                whiteSpace: "nowrap", marginLeft: "1rem",
                            }}
                        >
                            View / Download
                        </a>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}

