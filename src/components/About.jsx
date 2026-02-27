import { useEffect, useState } from "react";
import { getAbout } from "../services/aboutService";
import PageContainer from "./PageContainer";

export default function About() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const data = await getAbout();
      if (data) setContent(data.content);
      setLoading(false);
    };
    fetchAbout();
  }, []);

  return (
    <PageContainer>
      <h2 style={{ color: "#ff1e1e", marginBottom: "1.25rem", fontSize: "2rem", fontWeight: 700 }}>
        About Me
      </h2>
      <p style={{ maxWidth: "680px", lineHeight: "1.8", color: "#c0c0c0", fontSize: "1rem" }}>
        {loading ? "Loading…" : content ?? "No about content yet."}
      </p>
    </PageContainer>
  );
}
