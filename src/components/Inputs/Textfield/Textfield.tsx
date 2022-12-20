import { TextfieldProps } from "@order-certificate-types/inputs";
import React, { useEffect, useState } from "react";
import { TextField as MuiTextfield } from "@material-ui/core";

/* const Textfield = ({ className = "", ref, ...restProps }: TextfieldProps) => {
  return (
    <input ref={ref} className={`textfield ${className}`} {...restProps} />
  );
}; */

const Textfield = React.forwardRef<any, TextfieldProps>(
  (
    {
      className = "",
      placeholder = "Введите значение",
      value,
      onChange,
      ...rest
    }: TextfieldProps,
    ref
  ) => {
    const [stateValue, setStateValue] = useState(value);

    useEffect(() => {
      onChange(stateValue.trim());
    }, [stateValue]);

    return (
      <MuiTextfield
        variant="outlined"
        placeholder={placeholder}
        {...rest}
        value={stateValue}
        onChange={(event) => {
          setStateValue(event.target.value);
        }}
        ref={ref}
        className={`mui-textfield ${className}`}
      />
    );
  }
);

export default Textfield;
