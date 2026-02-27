import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/profileService";
import { getAbout } from "../services/aboutService";
import { getSkills } from "../services/skillsService";
import { getProjects } from "../services/projectService";
import FullSection from "../components/FullSection";

/* ── Shared style tokens ─────────────────────────────────────── */
const accent = "#ff1e1e";
const dim = "#888";
const border = "#1f1f1f";
const cardBg = "#0f0f0f";

const sectionLabel = {
    fontSize: "0.72rem",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: accent,
    fontWeight: 600,
    marginBottom: "1rem",
    display: "block",
};

const sectionHeading = {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 700,
    color: "#e6e6e6",
    lineHeight: 1.15,
    marginBottom: "1.25rem",
};

const seeAllLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    color: accent,
    fontWeight: 600,
    fontSize: "0.9rem",
    textDecoration: "none",
    marginTop: "2rem",
    letterSpacing: "0.3px",
    transition: "gap 0.2s",
};

const divider = {
    border: "none",
    borderTop: `1px solid ${border}`,
    margin: "0",
};

/* ── Scroll cue arrow ─────────────────────────────────────────── */
const ScrollCue = ({ to }) => (
    <a
        href={`#${to}`}
        style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            color: dim,
            fontSize: "0.75rem",
            letterSpacing: "1.5px",
            textDecoration: "none",
            animation: "scrollBounce 2s ease-in-out infinite",
        }}
    >
        <span style={{ letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.65rem" }}>scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    </a>
);

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
    const [profile, setProfile] = useState(null);
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProfile().then((d) => { if (d) setProfile(d); });
        getAbout().then((d) => { if (d) setAbout(d); });
        getSkills().then(setSkills);
        getProjects().then((d) => setProjects(d.slice(0, 3)));
    }, []);

    const name = profile?.name || "Rishi Lakshan";
    const title = profile?.title || "Artificial Intelligence & Machine Learning Student";
    const bio = about?.content || "";

    /* Group skills by category, show up to 8 chips */
    const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "AI/ML", "Tools & Technologies", "Data Science"];
    const topSkills = CATEGORY_ORDER.reduce((acc, cat) => {
        skills.filter((s) => s.category === cat).forEach((s) => acc.push({ ...s, cat }));
        return acc;
    }, []).slice(0, 8);

    return (
        <div style={{ background: "transparent" }}>
            {/* ── Scroll bounce keyframe ── */}
            <style>{`
                @keyframes scrollBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(8px); }
                }
                .home-skill-chip:hover { background: ${accent} !important; color: #fff !important; }
                .home-proj-card:hover { border-color: #ff1e1e44 !important; transform: translateY(-4px); }
                .home-proj-card { transition: border-color 0.2s, transform 0.25s; }
                .home-see-all:hover { gap: 0.6rem !important; }
                .home-contact-link { transition: color 0.2s; }
                .home-contact-link:hover { color: ${accent} !important; }
            `}</style>

            {/* ══ 1. HERO ══════════════════════════════════════════════ */}
            <FullSection id="hero" style={{ position: "relative", textAlign: "center", alignItems: "center" }}>
                <span style={sectionLabel}>Portfolio</span>
                <h1 style={{
                    fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    color: "#fff",
                    lineHeight: 1.1,
                    marginBottom: "1.2rem",
                    animation: "pageEnter 0.7s cubic-bezier(0.22,1,0.36,1) both",
                }}>
                    {name}
                </h1>
                <p style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                    color: accent,
                    letterSpacing: "1px",
                    fontWeight: 400,
                    maxWidth: "600px",
                    margin: "0 auto",
                    animation: "pageEnter 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both",
                }}>
                    {title}
                </p>

                {/* CTA buttons */}
                <div style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "2.5rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    animation: "pageEnter 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both",
                }}>
                    <Link to="/projects" style={{
                        padding: "0.75rem 2rem",
                        background: accent,
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textDecoration: "none",
                        letterSpacing: "0.5px",
                    }}>
                        View Projects
                    </Link>
                    <Link to="/contact" style={{
                        padding: "0.75rem 2rem",
                        background: "transparent",
                        color: "#e0e0e0",
                        border: `1px solid ${border}`,
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textDecoration: "none",
                        letterSpacing: "0.5px",
                    }}>
                        Get in Touch
                    </Link>
                </div>

                <ScrollCue to="about-preview" />
            </FullSection>

            <hr style={divider} />

            {/* ══ 2. ABOUT PREVIEW ═════════════════════════════════════ */}
            <FullSection id="about-preview">
                <span style={sectionLabel}>About Me</span>
                <h2 style={sectionHeading}>Who I Am</h2>
                <p style={{
                    fontSize: "1.05rem",
                    lineHeight: "1.85",
                    color: "#a9a9a9",
                    maxWidth: "680px",
                    margin: "0 auto",
                }}>
                    {bio
                        ? (bio.length > 320 ? bio.slice(0, 320).trimEnd() + "…" : bio)
                        : "Passionate about building intelligent systems and beautiful interfaces. Currently studying AI & ML, exploring the intersection of technology and creativity."}
                </p>
                <Link to="/about" className="home-see-all" style={seeAllLink}>
                    Read More <span>→</span>
                </Link>
            </FullSection>

            <hr style={divider} />

            {/* ══ 3. SKILLS PREVIEW ════════════════════════════════════ */}
            <FullSection id="skills-preview">
                <span style={sectionLabel}>Skills</span>
                <h2 style={sectionHeading}>What I Work With</h2>

                {topSkills.length === 0 ? (
                    <p style={{ color: dim }}>Skills loading…</p>
                ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                        {topSkills.map((sk) => (
                            <span
                                key={sk.id}
                                className="home-skill-chip"
                                style={{
                                    padding: "0.5rem 1.1rem",
                                    background: "#141414",
                                    border: `1px solid ${border}`,
                                    borderRadius: "999px",
                                    fontSize: "0.88rem",
                                    color: "#c0c0c0",
                                    fontWeight: 500,
                                    cursor: "default",
                                    transition: "background 0.2s, color 0.2s",
                                }}
                            >
                                {sk.name}
                            </span>
                        ))}
                    </div>
                )}

                <Link to="/skills" className="home-see-all" style={seeAllLink}>
                    See All Skills <span>→</span>
                </Link>
            </FullSection>

            <hr style={divider} />

            {/* ══ 4. PROJECTS PREVIEW ══════════════════════════════════ */}
            <FullSection id="projects-preview">
                <span style={sectionLabel}>Projects</span>
                <h2 style={sectionHeading}>Things I've Built</h2>

                {projects.length === 0 ? (
                    <p style={{ color: dim }}>Projects loading…</p>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.25rem",
                        justifyContent: "center",
                    }}>
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                className="home-proj-card"
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: "12px",
                                    padding: "1.6rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.6rem",
                                }}
                            >
                                {/* Top accent line */}
                                <div style={{ width: "32px", height: "3px", background: accent, borderRadius: "2px", marginBottom: "0.25rem" }} />
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{p.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: dim, lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                                    {p.description?.slice(0, 110)}{p.description?.length > 110 ? "…" : ""}
                                </p>
                                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    {p.github && (
                                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", color: accent, fontWeight: 600, textDecoration: "none" }}>
                                            GitHub ↗
                                        </a>
                                    )}
                                    {p.demo && (
                                        <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", color: "#888", fontWeight: 600, textDecoration: "none" }}>
                                            Live Demo ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Link to="/projects" className="home-see-all" style={seeAllLink}>
                    View All Projects <span>→</span>
                </Link>
            </FullSection>

            <hr style={divider} />

            {/* ══ 5. CONTACT PREVIEW ═══════════════════════════════════ */}
            <FullSection id="contact-preview" style={{ textAlign: "center" }}>
                <span style={sectionLabel}>Contact</span>
                <h2 style={{ ...sectionHeading, textAlign: "center" }}>Let's Work Together</h2>
                <p style={{ color: dim, fontSize: "1rem", maxWidth: "480px", lineHeight: "1.7", marginBottom: "2.5rem", margin: "0 auto 2.5rem" }}>
                    Have a project in mind or just want to say hi? I'm always open to new opportunities.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "420px", margin: "0 auto" }}>
                    {[
                        { label: "Email", value: "rishilakshan245@gmail.com", href: "mailto:rishilakshan245@gmail.com" },
                        { label: "GitHub", value: "github.com/Dazai070", href: "https://github.com/Dazai070" },
                        { label: "LinkedIn", value: "Rishi Lakshan", href: "https://www.linkedin.com/in/rishi-lakshan-93709031b" },
                    ].map(({ label, value, href }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            className="home-contact-link"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: cardBg,
                                border: `1px solid ${border}`,
                                borderRadius: "10px",
                                padding: "1rem 1.4rem",
                                textDecoration: "none",
                                color: "#c0c0c0",
                                fontSize: "0.92rem",
                            }}
                        >
                            <span style={{ color: dim, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</span>
                            <span style={{ fontWeight: 500 }}>{value}</span>
                        </a>
                    ))}
                </div>

                <Link to="/contact" className="home-see-all" style={{ ...seeAllLink, marginTop: "2.5rem" }}>
                    Open Contact Page <span>→</span>
                </Link>
            </FullSection>
        </div>
    );
}
