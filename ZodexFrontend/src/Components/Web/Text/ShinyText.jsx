const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  type,
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-${type ? type : "text"}  
      !text-white/30  ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
