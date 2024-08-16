import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../supabase";

const PostWithIcons = ({ post }) => {
  const { user, isSignedIn } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setloading] = useState(false);
  console.log(user);

  useEffect(() => {
    fetchFavoriteAndSaveStatus();
  }, [user]);

  const fetchFavoriteAndSaveStatus = async () => {
    if (isSignedIn) {
      setloading(false);
      const { data: favoriteData } = await supabase
        .from("favorites")
        .select("id")
        .eq("post_id", post.id)
        .eq("user_id", user.id);

      const { data: savedData } = await supabase
        .from("saved_posts")
        .select("id")
        .eq("post_id", post.id)
        .eq("user_id", user.id);

      setIsFavorited(favoriteData.length > 0);
      setIsSaved(savedData.length > 0);
      setloading(true);
    } else {
      setloading(false);
      setIsFavorited(false);
      setIsSaved(false);
      setloading(true);
    }
  };

  const handleFavoriteClick = async () => {
    console.log("loading");

    if (!isSignedIn) {
      alert("يجب عليك تسجيل الدخول لاستخدام هذه الخاصية.");
      return;
    }

    if (isFavorited) {
      await supabase
        .from("favorites")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);
      setIsFavorited(false);
    } else {
      await supabase
        .from("favorites")
        .insert({ post_id: post.id, user_id: user.id });
      setIsFavorited(true);
    }
    console.log("loaded");
  };

  const handleSaveClick = async () => {
    if (!isSignedIn) {
      alert("يجب عليك تسجيل الدخول لاستخدام هذه الخاصية.");
      return;
    }

    if (isSaved) {
      await supabase
        .from("saved_posts")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);
      setIsSaved(false);
    } else {
      await supabase
        .from("saved_posts")
        .insert({ post_id: post.id, user_id: user.id });
      setIsSaved(true);
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <span onClick={handleFavoriteClick} style={{ cursor: "pointer" }}>
              {isFavorited ? "❤️ مفضلة" : "♡ أضف إلى المفضلة"}
            </span>
            <span onClick={handleSaveClick} style={{ cursor: "pointer" }}>
              {isSaved ? "💾 محفوظ" : "📥 حفظ"}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostWithIcons;
