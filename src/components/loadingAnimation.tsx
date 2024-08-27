const LoadingAnimation = () => {
  return (
    <svg
      className="animate-spin absolute inset-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <circle
        className="origin-center"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="10 55"
        style={{ animationDuration: "1.5s" }}
      />
    </svg>
  );
};

export default LoadingAnimation;
