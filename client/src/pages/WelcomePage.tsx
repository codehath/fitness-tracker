import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
