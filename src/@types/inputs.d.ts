declare module "@order-certificate-types/inputs" {
  import { SelectProps as MuiSelectProps } from "@material-ui/core";
  import { DateRangePickerProps } from "@material-ui/pickers";

  export type TextfieldProps = {
    ref: any;
    value: string;
    onChange: (...event: any[]) => void;
    className?: string;
    placeholder?: string;
    style?: any;
    [key: string]: any;
  };

  export type SelectProps = MuiSelectProps & {
    ref?: any;
    value: SelectValueType;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    items?: SelectMenuItemType[];
    className?: string;
    placeholder?: string;
    style?: any;
    [key: string]: any;
  };

  export type MultipleSelectProps = SelectProps & {
    value: MultipleSelectValueType;
  };

  export type SelectMenuItemType = {
    Id: SelectValueType;
    Title: string;
    // selected?: boolean;
  };

  export type DateRangePickerProps = Pick<
    DateRangePickerProps,
    "value" | "onChange"
  > & {
    error?: boolean;
  };

  export type SelectValueType = string | number;
  export type MultipleSelectValueType = string[] | number[];
}
