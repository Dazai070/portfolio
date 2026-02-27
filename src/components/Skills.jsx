import { useEffect, useState } from 'react';
import { getSkills } from '../services/skillsService';
import './Skills.css';

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "AI/ML", "Tools & Technologies", "Data Science"];

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getSkills().then(setSkills);
    }, []);

    /* Group skills by category, preserving fixed order */
    const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
        const items = skills.filter((sk) => sk.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
    }, {});
    const other = skills.filter((sk) => !sk.category || !CATEGORY_ORDER.includes(sk.category));
    if (other.length) grouped["Other"] = other;

    const categories = Object.entries(grouped);

    return (
        <section id="skills">
            <div className="section-container">
                <h2 className="section-title">Skills</h2>
                {skills.length === 0 ? (
                    <p style={{ color: "#555" }}>No skills added yet.</p>
                ) : (
                    <div className="skills-grid">
                        {categories.map(([cat, items]) => (
                            <div className="skill-category" key={cat}>
                                <h3>{cat} Skills</h3>
                                <ul className="skill-list">
                                    {items.map((skill) => (
                                        <li className="skill-item" key={skill.id}>
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;

