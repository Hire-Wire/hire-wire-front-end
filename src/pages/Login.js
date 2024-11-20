import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { handleLoginClick } from "../handlers/authUtils";
import { handleBackClick } from "../handlers/navigationHandlers";
import { PATHS } from "../config/pageConfig";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.replace(PATHS.JOB_APPLICATION);
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginClick(e, email, password, setError, history);
  };

  return (
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body2" sx={{ textAlign: "right", marginBottom: 2 }}>
            <Link href="#" underline="hover">
              Forgot your password?
            </Link>
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1976D2",
              "&:hover": { backgroundColor: "#1565C0" },
              marginBottom: 2,
            }}
          >
            Log In
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => handleBackClick(history)}
            sx={{
              borderColor: "#1976D2",
              color: "#1976D2",
              "&:hover": { backgroundColor: "#E3F2FD", borderColor: "#1565C0" },
            }}
          >
            Back
          </Button>
        </form>
      </Box>
  );
}

export default Login;