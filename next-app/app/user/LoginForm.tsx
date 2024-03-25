"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const randomEmail = `${Math.random()
      .toString(36)
      .substring(7)}@example.com`;
    const password = "Password69420";

    const { data, error } = await supabase.auth.signUp({
      email: randomEmail,
      password,
    });

    if (error) {
      console.error(error);
      toast.error("Error creating user, check browser console");
    } else {
      console.log("User created and logged in:", data);
      toast.success("User created and logged in");
    }

    setLoading(false);
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleSignUp}
      disabled={loading}
    >
      {loading ? "Signing up..." : "Sign up with random email and password"}
    </button>
  );
}
