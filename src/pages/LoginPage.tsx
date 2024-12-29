import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateMagicLink, validateMagicLink } from "../api/AuthApi";
import SingleLineInput from "../components/SingleLineInput";
import InfoBox from "../components/InfoBox";
import { CircleButtonIcon } from "../constants/CircleButtonIcon";
import TokenHelper from "../helpers/TokenHelper"; // Import the TokenHelper class
import "./LoginPage.css";
import { MoonLoader } from "react-spinners";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track successful login
  const [shouldShowLoading, setShouldShowLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>("Loading...");

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

      if (response.axiosError) {
        setNotificationMessage(
          "Error with connection to server: " + response.axiosError.message
        );
      } else {
        if (response.success) {
          setNotificationMessage(
            `An email was sent to ${email} with a login link.`
          );
        } else {
          setNotificationMessage(response.error!.message);
        }
      }
    } catch (error) {
      console.error("Error sending magic link:", error);
      setNotificationMessage("Error sending magic link. Please try again.");
    }
  };

  // Validate the magic link if the query parameter is present
  useEffect(() => {
    if (TokenHelper.hasToken()) {
      navigate("/psd-files");
    } else {
      setShouldShowLoading(false);
      const magicLink = searchParams.get("magicLink");
      if (magicLink) {
        const validateLink = async () => {
          try {
            setShouldShowLoading(true);
            setLoadingText("Validating your magic link...");
            const response = await validateMagicLink(magicLink);
            setShouldShowLoading(false);
            if (response.axiosError) {
              setNotificationMessage(
                "Error with connection to server: " +
                  response.axiosError.message
              );
            } else {
              if (response.success) {
                setNotificationMessage("Login successful!");
                TokenHelper.setToken(response.data!.token, 7200);
                setIsLoggedIn(true);
              } else {
                setNotificationMessage(response.error!.message);
              }
            }
          } catch {
            setNotificationMessage("Unknown error when validating magic link.");
          }
        };

        validateLink();
      }
    }
  }, [searchParams, navigate]);

  const handleOkClick = () => {
    setNotificationMessage(null); // Hide the notification
    setEmail(""); // Clear the input field
    if (isLoggedIn) {
      navigate("/psd-files"); // Navigate to the '/psd-files' page only if login was successful
    }
  };

  return (
    <div className="login-page">
      {notificationMessage ? (
        <InfoBox text={notificationMessage} onClose={handleOkClick} />
      ) : (
        <>
          {shouldShowLoading ? (
            <>
              <h1 className="login-title">{loadingText}</h1>
              <MoonLoader size={30} color="white" />
            </>
          ) : (
            <>
              <h1 className="login-title">Enter your email</h1>
              <SingleLineInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter email..."
                onSubmit={handleLogin}
                buttonAriaLabel="Send magic link login email"
                buttonIcon={CircleButtonIcon.ArrowRight}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LoginPage;
