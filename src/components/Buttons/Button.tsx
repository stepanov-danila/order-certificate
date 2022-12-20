import { ButtonProps } from "@order-certificate-types/buttons";
import { ButtonPropsSizeEnum, ButtonPropsVariantEnum } from "./enums";

const Button = ({
  children,
  size = ButtonPropsSizeEnum.Medium,
  variant = ButtonPropsVariantEnum.Primary,
  context = null,
  disabled = false,
  type = "button",
  handleClick = () => false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className="btn"
      data-size={size}
      data-variant={variant}
      data-context={context}
      data-disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
