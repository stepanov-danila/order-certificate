import { FieldsetProps } from "@order-certificate-types/forms";
import React from "react";
import { FieldsetPropsLabelPlacementEnum } from "./enums";

const Fieldset = ({
  label,
  component,
  labelPlacement = FieldsetPropsLabelPlacementEnum.Start,
  labelStyles = null,
  context = null,
  required = null,
  hint = null,
}: FieldsetProps) => {
  return (
    <div
      className="fieldset"
      data-placement={labelPlacement}
      data-context={context}
      data-required={required}
    >
      <div className="fieldset__label" style={labelStyles}>
        {label}
      </div>
      <div className="fieldset__component">
        {component}
        {hint && <p className="fieldset__hint">{hint}</p>}
      </div>
    </div>
  );
};

export default Fieldset;
