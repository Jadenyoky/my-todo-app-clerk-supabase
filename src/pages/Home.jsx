import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/todos");
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to the To-Do App!</h1>
      <button className="header-button" onClick={handleGetStarted}>
        Get Started
      </button>
      <SignedIn>
        <div className="header">
          <UserButton />
          <h1>in home only when signin</h1>
        </div>
      </SignedIn>
    </div>
  );
}

export default Home;
