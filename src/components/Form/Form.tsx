import { FormProps } from "@order-certificate-types/forms";
import { ThemesEnum } from "./enums";

const Form = ({
  fields,
  actions,
  context,
  onSubmit,
  theme = ThemesEnum.Default,
}: FormProps) => {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
      data-context={context}
      data-theme={theme}
    >
      <div className="form__fields">{fields}</div>
      <div className="form__actions">{actions}</div>
    </form>
  );
};

export default Form;
