import { useState } from "react";
import { supabase } from "./client";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert username → fake email
  const usernameToEmail = (username: string) => {
    return `${username}@aslearn.app`.toLowerCase();
  };

  const handleSignup = async () => {
    if (form.password !== form.confirm)
      return alert("Passwords do not match!");

    const { error } = await supabase.auth.signUp({
      email: usernameToEmail(form.username),
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
        },
      },
    });

    if (error) alert(error.message);
    else {
      alert("Account created! Please log in.");
      setMode("login");
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(form.username),
      password: form.password,
    });

    if (error) alert(error.message);
    else {
      alert("Logged in!");
      onLogin();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={{ color: "#3E2A1F", textAlign: "center" }}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {mode === "signup" && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        {mode === "signup" && (
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <button
          onClick={mode === "login" ? handleLogin : handleSignup}
          style={styles.button}
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span style={styles.link} onClick={() => setMode("signup")}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => setMode("login")}>
                Log In
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#F5E9DA",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,

  box: {
    background: "#D7C0AE",
    padding: "30px",
    borderRadius: "16px",
    width: "340px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #8B5E3C",
  } as React.CSSProperties,

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#8B5E3C",
    color: "white",
    cursor: "pointer",
  } as React.CSSProperties,

  link: {
    color: "#6F462E",
    cursor: "pointer",
    fontWeight: "bold",
  } as React.CSSProperties,
};
