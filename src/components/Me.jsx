import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import "./Me.css";

export default function Me() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then((data) => { if (data) setProfile(data); });
  }, []);

  const name = profile?.name || "Rishi Lakshan";
  const title = profile?.title || "Artificial Intelligence & Machine Learning Student";

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{name}</h1>
        <p className="hero-subtitle">{title}</p>
      </div>
    </section>
  );
}
