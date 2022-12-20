import Select from "../Inputs/Select/Select";
import Textfield from "../Inputs/Textfield/Textfield";

type IProps = {
  type: any;
  options: any;
};

const FieldComponent: React.FC<IProps> = (props) => {
  const {
    type,
    options: {
      input: { onChange, value, ...restInput },
      meta,
      label,
      labelTooltip,
      valid,
      hint,
      error,
      ...rest
    },
  } = props;

  const Type = type;

  return (
    <>
      {label}
      <Type value={value} onChange={onChange} {...restInput} />
    </>
  );
};

const FieldTextfield = (options: any) => {
  return <FieldComponent type={Textfield} options={options} />;
};

const FieldSelect = (options: any) => {
  return <FieldComponent type={Select} options={options} />;
};

export { FieldTextfield, FieldSelect };
