import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: 250,
          padding: "1rem",
          background: "#426991ff",
          color: "#ecf0f1",
        }}
      >
        <h1>Cat Dashboard 🐱</h1>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link></li>
        </ul>
      </nav>
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
