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
    </div>
  );
}

export default Home;
