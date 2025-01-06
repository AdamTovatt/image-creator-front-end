import { useState, useEffect } from "react";

const DEFAULT_MS = 30;

export interface ITypewriterProps {
  children: string;
  speed?: number;
  loop?: boolean;
  random?: number;
  delay?: number;
  cursor?: boolean;
  onFinished?: () => void;
  onStart?: () => void;
  blink?: boolean; // New prop to control blinking
}

export default function TypewriterText({
  children,
  speed = DEFAULT_MS,
  random = DEFAULT_MS,
  onFinished = () => {},
  onStart = () => {},
  blink = false, // Default to no blinking
}: ITypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [opacity, setOpacity] = useState(1); // Track the opacity for blinking
  const [blinkCount, setBlinkCount] = useState(0); // Track the number of blinks
  const [isBlinking, setIsBlinking] = useState(false); // State to trigger blinking
  const [canBlink, setCanBlink] = useState(true); // State to control blinking

  const text = children as string;

  useEffect(() => {
    if (currentTextIndex < text.length) {
      const timeout = setTimeout(() => {
        if (currentTextIndex === 0) onStart();
        setCurrentTextIndex((prev) => prev + 1);
      }, speed + Math.random() * random);

      return () => clearTimeout(timeout);
    } else {
      onFinished();
      if (blink) {
        setIsBlinking(true); // Start blinking when typing is done
      }
    }
  }, [currentTextIndex, text, speed, random, onFinished, onStart, blink]);

  useEffect(() => {
    if (canBlink) {
      if (isBlinking) {
        const blinkInterval = setInterval(() => {
          setOpacity((prev) => (prev === 1 ? 0 : 1)); // Toggle opacity between 1 and 0
          setBlinkCount((prev) => prev + 1);

          // Stop after 2 full blinks (4 toggles)
          if (blinkCount >= 3) {
            clearInterval(blinkInterval); // Stop blinking
            setIsBlinking(false); // Reset blinking state
            setCanBlink(false); // Prevent blinking from starting again
          }
        }, 500); // 500ms per blink

        return () => clearInterval(blinkInterval);
      }
    }
  }, [isBlinking, blinkCount, canBlink]);

  return <span style={{ opacity }}>{text.substring(0, currentTextIndex)}</span>;
}
