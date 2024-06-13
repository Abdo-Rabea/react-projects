import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNave from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import "../index.css";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const { user, isAuthenticated, login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);

    // navigate("/app");
  }
  // this useEffect solves the problem if you are already logined and also you can't do it inside handleLogin as login is async. in real world
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNave />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
