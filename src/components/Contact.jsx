import "./Contact.css";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "rishilakshan245@gmail.com",
    href: "mailto:rishilakshan245@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/Dazai070",
    href: "https://github.com/Dazai070",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Rishi Lakshan",
    href: "https://www.linkedin.com/in/rishi-lakshan-93709031b",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section section-spacing">
      <div className="section-container">
        <p className="section-label">CONTACT</p>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-description">
          I'm open to new opportunities, collaborations, and interesting projects.
          Feel free to reach out through any of the channels below.
        </p>

        <div className="contact-cards">
          {CONTACT_LINKS.map(({ label, value, href, external }) => (
            <div key={label} className="contact-card">
              <span className="contact-card-label">{label}</span>
              <a
                href={href}
                className="contact-card-link"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}