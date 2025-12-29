import ShinyText from "./ShinyText";

const SubHeading = ({ line1, css, line2, type }) => {
  return (
    <p className={`flex flex-col`}>
      <ShinyText
        type={type}
        text={line1}
        disabled={false}
        speed={3}
        className={`${css ? css : ""} custom-class  poppins-regular leading-6`}
      />
      <ShinyText
        type={type}
        text={line2}
        disabled={false}
        speed={3}
        className={`${css ? css : ""} custom-class  poppins-regular leading-6`}
      />
    </p>
  );
};

export default SubHeading;
