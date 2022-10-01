import { useState } from "react";
import { signupAdminFetchPath } from "../api/fetchpaths";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (
    organization,
    first_name,
    last_name,
    email,
    password
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(signupAdminFetchPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organization,
        first_name,
        last_name,
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      navigate("/login");
    }
  };

  return { signup, isLoading, error };
};
