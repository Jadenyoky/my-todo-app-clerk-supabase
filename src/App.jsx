import { Routes, Route, useLocation, Link } from "react-router-dom";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import "./styles.css"; // تأكد من استيراد ملف CSS هنا
import Test from "./components/test";
import Posts from "./pages/Posts";
import Voice from "./voice";

function App() {
  const pathname = useLocation();
  return (
    <div>
      <Test />
      <Link to="/posts">To Posts</Link>
      <br />
      <Link to="/voice">To voice</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todos"
          element={
            <>
              <SignedOut>
                <h1>in home only when signout</h1>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <Todos />
              </SignedIn>
            </>
          }
        />
        <Route path="/posts" element={<Posts />} />
        <Route path="/voice" element={<Voice />} />
      </Routes>
    </div>
  );
}

export default App;
