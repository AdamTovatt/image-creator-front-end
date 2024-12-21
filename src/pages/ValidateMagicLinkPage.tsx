import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { validateMagicLink } from "../api/AuthApi";

const ValidateMagicLinkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await validateMagicLink(token);
          localStorage.setItem("jwt", response.data?.token || "");
          alert("Login successful!");
          window.location.href = "/"; // Redirect to the main page
        } catch (error) {
          alert("Invalid or expired magic link.");
          console.log(error);
        }
      }
    };

    validateToken();
  }, [token]);

  return <div>Validating magic link...</div>;
};

export default ValidateMagicLinkPage;
