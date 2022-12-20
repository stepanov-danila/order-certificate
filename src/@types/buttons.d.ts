declare module "@order-certificate-types/buttons" {
  import { ButtonPropsSizeEnum } from "../components/Buttons/enums";
  import { ButtonHTMLAttributes } from "react";

  export type ButtonProps = {
    children: any;
    context?: string | null;
    disabled?: boolean;
    size?: ButtonPropsSizeEnum;
    type?: "button" | "submit" | "reset";
    variant?: ButtonPropsVariantEnum;
    handleCLick?: () => {};
    [key: string]: any;
  };
}
