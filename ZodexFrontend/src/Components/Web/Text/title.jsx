import ShinyText from "./ShinyText";

const Title = ({ text, css, text2, type }) => {
  return (
    <p className={`flex flex-col `}>
      <ShinyText
        type={type}
        text={text}
        disabled={false}
        speed={3}
        className={`${
          css ? css : ""
        } custom-class lg:text-sm md:text-sm text-xs poppins-medium`}
      />
    </p>
  );
};

export default Title;
