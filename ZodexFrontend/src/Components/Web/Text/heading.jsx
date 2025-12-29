const Heading = ({ line1, line2, css }) => {
  return (
    <h2
      className={` ${css} text-[8vw] sm:text-4xl md:text-4xl lg:text-4xl  w-full      leading-tight`}
    >
      {line1}
      <br /> {line2}
    </h2>
  );
};

export default Heading;
