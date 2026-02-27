import { useState, useEffect } from "react";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from "firebase/firestore";
import { db } from "../firebase";
import { getAbout, saveAbout } from "../services/aboutService";
import { getProfile, saveProfile } from "../services/profileService";
import { getSkills, addSkill, deleteSkill } from "../services/skillsService";
import { getResume, addResume, deleteResume } from "../services/resumeService";
import { getCertifications, addCertification, deleteCertification } from "../services/certificationsService";

/* ─── Style tokens ──────────────────────────────────────────────────── */
const S = {
    page: {
        minHeight: "100vh", background: "#050505", display: "flex",
        justifyContent: "center", alignItems: "flex-start",
        padding: "3rem 1rem", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#e0e0e0",
    },
    card: {
        width: "100%", maxWidth: "700px", background: "#0f0f0f",
        border: "1px solid #1f1f1f", borderRadius: "12px", padding: "2.5rem",
        boxShadow: "0 0 40px rgba(255,30,30,0.06)",
    },
    heading: { fontSize: "1.6rem", fontWeight: 700, color: "#ff1e1e", marginBottom: "0.3rem", letterSpacing: "0.5px" },
    subheading: { fontSize: "0.85rem", color: "#555", marginBottom: "2rem" },
    label: { fontSize: "0.8rem", color: "#888", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" },
    input: {
        width: "100%", padding: "0.65rem 0.9rem", background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: "6px", color: "#e0e0e0", fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
    },
    fieldWrap: { marginBottom: "1.2rem" },
    btn: {
        padding: "0.6rem 1.4rem", background: "#ff1e1e", color: "#fff", border: "none",
        borderRadius: "6px", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.5px",
    },
    btnGhost: {
        padding: "0.4rem 0.9rem", background: "transparent", color: "#888", border: "1px solid #2a2a2a",
        borderRadius: "6px", fontWeight: 500, fontSize: "0.82rem", cursor: "pointer",
    },
    btnDanger: {
        padding: "0.4rem 0.9rem", background: "transparent", color: "#ff1e1e", border: "1px solid #ff1e1e44",
        borderRadius: "6px", fontWeight: 500, fontSize: "0.82rem", cursor: "pointer",
    },
    divider: { border: "none", borderTop: "1px solid #1f1f1f", margin: "2rem 0" },
    sectionTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#ff1e1e", marginBottom: "1rem" },
    status: { marginLeft: "1rem", fontSize: "0.84rem", color: "#888" },
    error: { marginTop: "0.5rem", fontSize: "0.84rem", color: "#ff1e1e" },
    row: { display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem", padding: "0.7rem 0.9rem", background: "#141414", borderRadius: "6px", border: "1px solid #1f1f1f" },
    rowText: { flex: 1, fontSize: "0.92rem" },
    rowSub: { fontSize: "0.78rem", color: "#555", marginTop: "0.15rem" },
};

const glow = (e) => { e.target.style.boxShadow = "0 0 14px rgba(255,30,30,0.45)"; };
const unglow = (e) => { e.target.style.boxShadow = "none"; };

const ADMIN_PASSWORD = "2806";
const TABS = ["Profile", "About", "Projects", "Skills", "Resume", "Certifications"];

/* ── Helper: status message ── */
const StatusMsg = ({ msg }) => msg ? <span style={S.status}>{msg}</span> : null;

/* ══════════════════════════════════════════════════════════════════════
   TAB: PROFILE
══════════════════════════════════════════════════════════════════════ */
const ProfileTab = () => {
    const [form, setForm] = useState({ name: "", title: "", intro: "" });
    const [status, setStatus] = useState("");

    useEffect(() => {
        getProfile().then((data) => { if (data) setForm({ name: data.name || "", title: data.title || "", intro: data.intro || "" }); });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("Saving…");
        try { await saveProfile(form); setStatus("Saved!"); }
        catch { setStatus("Error saving."); }
    };

    return (
        <form onSubmit={handleSave}>
            <h2 style={S.sectionTitle}>Profile</h2>
            {[["name", "Name", "text"], ["title", "Title / Role", "text"]].map(([key, lbl, type]) => (
                <div key={key} style={S.fieldWrap}>
                    <label style={S.label}>{lbl}</label>
                    <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} style={S.input} />
                </div>
            ))}
            <div style={S.fieldWrap}>
                <label style={S.label}>Intro</label>
                <textarea value={form.intro} onChange={(e) => setForm((p) => ({ ...p, intro: e.target.value }))} rows={4} style={{ ...S.input, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Save Profile</button>
                <StatusMsg msg={status} />
            </div>
        </form>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB: ABOUT
══════════════════════════════════════════════════════════════════════ */
const AboutTab = () => {
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => { getAbout().then((d) => { if (d?.content) setContent(d.content); }); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("Saving…");
        try { await saveAbout(content); setStatus("Saved!"); }
        catch { setStatus("Error saving."); }
    };

    return (
        <form onSubmit={handleSave}>
            <h2 style={S.sectionTitle}>About</h2>
            <div style={S.fieldWrap}>
                <label style={S.label}>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={7} style={{ ...S.input, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Save About</button>
                <StatusMsg msg={status} />
            </div>
        </form>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB: PROJECTS
══════════════════════════════════════════════════════════════════════ */
const EMPTY_PROJ = { title: "", description: "", github: "", demo: "" };

const ProjectsTab = () => {
    const [projects, setProjects] = useState([]);
    const [newForm, setNewForm] = useState(EMPTY_PROJ);
    const [addStatus, setAddStatus] = useState("");
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState(EMPTY_PROJ);
    const [editStatus, setEditStatus] = useState("");

    const fetchProjects = async () => {
        const snap = await getDocs(collection(db, "projects"));
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    useEffect(() => { fetchProjects(); }, []);

    /* Add */
    const handleAdd = async (e) => {
        e.preventDefault();
        setAddStatus("Adding…");
        try {
            await addDoc(collection(db, "projects"), newForm);
            setNewForm(EMPTY_PROJ);
            setAddStatus("Added!");
            fetchProjects();
        } catch { setAddStatus("Error."); }
    };

    /* Edit */
    const startEdit = (p) => { setEditId(p.id); setEditForm({ title: p.title, description: p.description, github: p.github, demo: p.demo || "" }); setEditStatus(""); };
    const cancelEdit = () => { setEditId(null); setEditStatus(""); };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setEditStatus("Saving…");
        try {
            await updateDoc(doc(db, "projects", editId), editForm);
            setEditId(null);
            setEditStatus("");
            fetchProjects();
        } catch { setEditStatus("Error saving."); }
    };

    /* Delete */
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this project?")) return;
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
    };

    const fieldChange = (setter) => (e) => setter((p) => ({ ...p, [e.target.name]: e.target.value }));

    const ProjFields = ({ form, setter, idPrefix }) => (
        <>
            {[["title", "Title", "text"], ["description", "Description", "textarea"], ["github", "GitHub URL", "text"], ["demo", "Demo URL (optional)", "text"]].map(([key, lbl, type]) => (
                <div key={key} style={S.fieldWrap}>
                    <label style={S.label}>{lbl}</label>
                    {type === "textarea"
                        ? <textarea id={`${idPrefix}-${key}`} name={key} value={form[key]} onChange={fieldChange(setter)} rows={3} style={{ ...S.input, resize: "vertical" }} />
                        : <input id={`${idPrefix}-${key}`} type="text" name={key} value={form[key]} onChange={fieldChange(setter)} style={S.input} required={key !== "demo"} />
                    }
                </div>
            ))}
        </>
    );

    return (
        <div>
            <h2 style={S.sectionTitle}>Projects</h2>

            {/* List */}
            {projects.length === 0 && <p style={{ color: "#555", marginBottom: "1.5rem" }}>No projects yet.</p>}
            {projects.map((p) => (
                <div key={p.id}>
                    {editId === p.id ? (
                        <form onSubmit={handleUpdate} style={{ ...S.row, flexDirection: "column", alignItems: "flex-start" }}>
                            <ProjFields form={editForm} setter={setEditForm} idPrefix="edit" />
                            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                                <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Save</button>
                                <button type="button" style={S.btnGhost} onClick={cancelEdit}>Cancel</button>
                                <StatusMsg msg={editStatus} />
                            </div>
                        </form>
                    ) : (
                        <div style={S.row}>
                            <div style={S.rowText}>
                                <div>{p.title}</div>
                                <div style={S.rowSub}>{p.description?.slice(0, 80)}{p.description?.length > 80 ? "…" : ""}</div>
                            </div>
                            <button style={S.btnGhost} onClick={() => startEdit(p)}>Edit</button>
                            <button style={S.btnDanger} onClick={() => handleDelete(p.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}

            <hr style={S.divider} />
            <h2 style={S.sectionTitle}>Add New Project</h2>
            <form onSubmit={handleAdd}>
                <ProjFields form={newForm} setter={setNewForm} idPrefix="new" />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Add Project</button>
                    <StatusMsg msg={addStatus} />
                </div>
            </form>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB: SKILLS
══════════════════════════════════════════════════════════════════════ */
const CATEGORIES = ["Frontend", "Backend", "Database", "AI/ML", "Tools & Technologies", "Data Science"];

const SkillsTab = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
    const [status, setStatus] = useState("");

    const fetchSkills = () => getSkills().then(setSkills);
    useEffect(() => { fetchSkills(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        setStatus("Adding…");
        try { await addSkill(newSkill.trim(), newCategory); setNewSkill(""); setStatus("Added!"); fetchSkills(); }
        catch { setStatus("Error."); }
    };

    const handleDelete = async (id) => {
        await deleteSkill(id);
        fetchSkills();
    };

    /* Group skills by category for display */
    const grouped = CATEGORIES.reduce((acc, cat) => {
        const items = skills.filter((sk) => sk.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
    }, {});
    const uncategorised = skills.filter((sk) => !sk.category || !CATEGORIES.includes(sk.category));
    if (uncategorised.length) grouped["Other"] = uncategorised;

    return (
        <div>
            <h2 style={S.sectionTitle}>Skills</h2>

            {skills.length === 0 && <p style={{ color: "#555", marginBottom: "1rem" }}>No skills yet.</p>}

            {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: "1.2rem" }}>
                    <p style={{ fontSize: "0.78rem", color: "#ff1e1e", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "0.4rem" }}>{cat}</p>
                    {items.map((sk) => (
                        <div key={sk.id} style={S.row}>
                            <span style={S.rowText}>{sk.name}</span>
                            <button style={S.btnDanger} onClick={() => handleDelete(sk.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ))}

            <hr style={S.divider} />
            <h2 style={S.sectionTitle}>Add New Skill</h2>
            <form onSubmit={handleAdd}>
                <div style={S.fieldWrap}>
                    <label style={S.label}>Skill Name</label>
                    <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g. PyTorch" style={S.input} required />
                </div>
                <div style={S.fieldWrap}>
                    <label style={S.label}>Category</label>
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ ...S.input, cursor: "pointer" }}>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Add Skill</button>
                    <StatusMsg msg={status} />
                </div>
            </form>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB: RESUME
══════════════════════════════════════════════════════════════════════ */
const EMPTY_RESUME = { fileName: "", fileURL: "" };

const ResumeTab = () => {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState(EMPTY_RESUME);
    const [status, setStatus] = useState("");

    const fetchEntries = () => getResume().then(setEntries);
    useEffect(() => { fetchEntries(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.fileName.trim() || !form.fileURL.trim()) return;
        setStatus("Saving…");
        try {
            await addResume(form);
            setForm(EMPTY_RESUME);
            setStatus("Saved!");
            fetchEntries();
        } catch { setStatus("Error saving."); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this resume entry?")) return;
        await deleteResume(id);
        fetchEntries();
    };

    return (
        <div>
            <h2 style={S.sectionTitle}>Resume</h2>

            {entries.length === 0 && <p style={{ color: "#555", marginBottom: "1rem" }}>No resume entries yet.</p>}
            {entries.map((entry) => (
                <div key={entry.id} style={S.row}>
                    <div style={S.rowText}>
                        <div>{entry.fileName}</div>
                        <div style={S.rowSub}>{entry.fileURL?.slice(0, 60)}{entry.fileURL?.length > 60 ? "…" : ""}</div>
                    </div>
                    <button style={S.btnDanger} onClick={() => handleDelete(entry.id)}>Delete</button>
                </div>
            ))}

            <hr style={S.divider} />
            <h2 style={S.sectionTitle}>Add Resume Link</h2>
            <form onSubmit={handleAdd}>
                {[["fileName", "File Name"], ["fileURL", "Google Drive URL"]].map(([key, lbl]) => (
                    <div key={key} style={S.fieldWrap}>
                        <label style={S.label}>{lbl}</label>
                        <input
                            type="text"
                            value={form[key]}
                            onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                            placeholder={key === "fileURL" ? "https://drive.google.com/..." : "e.g. Resume_2024.pdf"}
                            style={S.input}
                            required
                        />
                    </div>
                ))}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Add Resume</button>
                    <StatusMsg msg={status} />
                </div>
            </form>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB: CERTIFICATIONS
══════════════════════════════════════════════════════════════════════ */
const EMPTY_CERT = { title: "", issuer: "", year: "", fileURL: "" };

const CertificationsTab = () => {
    const [certs, setCerts] = useState([]);
    const [form, setForm] = useState(EMPTY_CERT);
    const [status, setStatus] = useState("");

    const fetchCerts = () => getCertifications().then(setCerts);
    useEffect(() => { fetchCerts(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setStatus("Saving…");
        try {
            await addCertification(form);
            setForm(EMPTY_CERT);
            setStatus("Saved!");
            fetchCerts();
        } catch { setStatus("Error saving."); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this certification?")) return;
        await deleteCertification(id);
        fetchCerts();
    };

    return (
        <div>
            <h2 style={S.sectionTitle}>Certifications</h2>

            {certs.length === 0 && <p style={{ color: "#555", marginBottom: "1rem" }}>No certifications yet.</p>}
            {certs.map((cert) => (
                <div key={cert.id} style={S.row}>
                    <div style={S.rowText}>
                        <div>{cert.title}</div>
                        <div style={S.rowSub}>{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</div>
                    </div>
                    <button style={S.btnDanger} onClick={() => handleDelete(cert.id)}>Delete</button>
                </div>
            ))}

            <hr style={S.divider} />
            <h2 style={S.sectionTitle}>Add Certification</h2>
            <form onSubmit={handleAdd}>
                {[["title", "Title"], ["issuer", "Issuer"], ["year", "Year"], ["fileURL", "Google Drive URL"]].map(([key, lbl]) => (
                    <div key={key} style={S.fieldWrap}>
                        <label style={S.label}>{lbl}</label>
                        <input
                            type="text"
                            value={form[key]}
                            onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                            placeholder={key === "fileURL" ? "https://drive.google.com/..." : key === "year" ? "e.g. 2024" : ""}
                            style={S.input}
                            required={key !== "fileURL"}
                        />
                    </div>
                ))}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Add Certification</button>
                    <StatusMsg msg={status} />
                </div>
            </form>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   ROOT ADMIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
const Admin = () => {
    /* Auth */
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [authError, setAuthError] = useState("");
    const [activeTab, setActiveTab] = useState("Profile");

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) { setLoggedIn(true); setAuthError(""); }
        else setAuthError("Incorrect password. Try again.");
    };

    /* Login screen */
    if (!loggedIn) {
        return (
            <div style={S.page}>
                <div style={S.card}>
                    <h1 style={S.heading}>Admin Access</h1>
                    <p style={S.subheading}>Enter your password to continue.</p>
                    <form onSubmit={handleLogin}>
                        <div style={S.fieldWrap}>
                            <label htmlFor="adminPass" style={S.label}>Password</label>
                            <input id="adminPass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••" autoFocus style={S.input} />
                            {authError && <p style={S.error}>{authError}</p>}
                        </div>
                        <button type="submit" style={S.btn} onMouseEnter={glow} onMouseLeave={unglow}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    /* Dashboard */
    return (
        <div style={S.page}>
            <div style={S.card}>
                <h1 style={S.heading}>Admin Dashboard</h1>
                <p style={S.subheading}>Manage your portfolio content.</p>

                {/* Tab bar */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: "1px solid",
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: "0.88rem",
                                transition: "all 0.15s",
                                background: activeTab === tab ? "#ff1e1e" : "transparent",
                                color: activeTab === tab ? "#fff" : "#666",
                                borderColor: activeTab === tab ? "#ff1e1e" : "#2a2a2a",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {activeTab === "Profile" && <ProfileTab />}
                {activeTab === "About" && <AboutTab />}
                {activeTab === "Projects" && <ProjectsTab />}
                {activeTab === "Skills" && <SkillsTab />}
                {activeTab === "Resume" && <ResumeTab />}
                {activeTab === "Certifications" && <CertificationsTab />}
            </div>
        </div>
    );
};

export default Admin;
