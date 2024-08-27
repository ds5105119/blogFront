import React, { useState, useEffect } from "react";

export default function AnimatedGradientText(props: {
  texts?: Array<string>;
  gradients?: Array<string>;
}) {
  const { texts = [""], gradients = [""] } = props;
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = texts[index];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, 180);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }, 230);
    }

    return () => clearTimeout(timer);
  }, [displayText, index, isDeleting]);

  return (
    <div className="text-cente">
      <h2 className="text-4xl md:text-4xl font-bold tracking-wide">
        <span
          className={`bg-gradient-to-r ${gradients[index]} text-transparent bg-clip-text transition-all duration-500`}
        >
          {displayText}
        </span>
        <span className="animate-blink font-medium">|</span>
      </h2>
    </div>
  );
}
