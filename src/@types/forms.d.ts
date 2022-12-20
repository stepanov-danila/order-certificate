declare module "@order-certificate-types/forms" {
  import {
    FieldsetPropsLabelPlacementEnum,
    ThemesEnum,
  } from "../components/Form/enums";

  export type FormProps = {
    fields: JSX.Element;
    actions: JSX.Element;
    context?: string | null;
    theme?: ThemesEnum;
    onSubmit?: function;
  };

  export type FieldBoxProps = {
    head: string;
    body: any;
  };

  export type FieldsetProps = {
    label: string;
    component: any;
    labelPlacement?: FieldsetPropsLabelPlacementEnum;
    labelStyles?: any;
    theme?: FieldsetPropsThemeEnum;
    context?: string | null;
    required?: boolean | null;
    hint?: JSX.Element | null;
  };
}
