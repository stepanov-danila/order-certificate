import { TextProps } from "@order-certificate-types/typography";

const Text = ({ children, style = null }: TextProps) => {
  return (
    <p className="text" style={style}>
      {children}
    </p>
  );
};

export default Text;
