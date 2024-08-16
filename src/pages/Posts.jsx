import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import PostWithIcons from "../components/PostWithIcons";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data.slice(0, 100)); // جلب أول 100 بوست
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>المنشورات</h1>
      </header>
      <SignedIn>
        <UserButton className="btn sign-out-btn" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" className="btn sign-in-btn">
          تسجيل الدخول
        </SignInButton>
      </SignedOut>

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <PostWithIcons post={post} />
        </div>
      ))}
    </div>
  );
};

export default App;
