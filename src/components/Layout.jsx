import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div style={{ background: "transparent", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ paddingTop: "80px" }}>
                {children}
            </main>
        </div>
    );
}
