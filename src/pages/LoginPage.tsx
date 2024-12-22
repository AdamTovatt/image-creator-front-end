import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateMagicLink, validateMagicLink } from "../api/AuthApi";
import CircleButton from "../components/CircleButton";
import SingleLineInput from "../components/SingleLineInput";
import InfoBox from "../components/InfoBox";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import TokenHelper from "../helpers/TokenHelper"; // Import the TokenHelper class
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleLogin = async () => {
    try {
      const response = await generateMagicLink({
        email,
        baseUrl: "http://localhost:5173/?magicLink=", // Updated base URL
        productName: "Image Creator",
        dateAndTime: formatDate(new Date()),
      });

      if (response?.message) {
        setNotificationMessage(response.message);
      } else {
        setNotificationMessage(
          `An email was sent to ${email} with a login link.`
        );
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      setNotificationMessage("Error sending magic link. Please try again.");
    }
  };

  // Validate the magic link if the query parameter is present
  useEffect(() => {
    const magicLink = searchParams.get("magicLink");
    if (magicLink) {
      const validateLink = async () => {
        try {
          const response = await validateMagicLink(magicLink); // Full `ApiResponse` is returned
          const token = response.data?.token; // Access `token` from `data`

          if (token) {
            setNotificationMessage("Login successful!");
            TokenHelper.setToken(token); // Store the token using TokenHelper
          } else {
            throw new Error("No token found in response");
          }
        } catch (error) {
          console.error("Error validating magic link:", error);
          setNotificationMessage(
            "Failed to validate magic link. Please try again."
          );
        }
      };

      validateLink();
    }
  }, [searchParams]);

  const handleOkClick = () => {
    setNotificationMessage(null); // Hide the notification
    setEmail(""); // Clear the input field
    navigate("/psd-files"); // Navigate to the '/psd-files' page when "OK" is clicked
  };

  return (
    <div className="login-page">
      {notificationMessage ? (
        <InfoBox text={notificationMessage} onClose={handleOkClick} />
      ) : (
        <>
          <h1 className="login-title">Enter your email</h1>
          <SingleLineInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter email..."
            button={
              <CircleButton
                onClick={handleLogin}
                icon={CircleButtonIcon.ArrowRight}
                ariaLabel="Send Magic Link"
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default LoginPage;
