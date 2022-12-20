import { IconButton, TextField } from "@material-ui/core";
import { Event } from "@material-ui/icons";
import { DateRangePicker as MuiDateRangePicker } from "@material-ui/pickers";
import { DateRangePickerProps } from "@order-certificate-types/inputs";
import { useState } from "react";

const DateRangePicker = ({
  value,
  onChange,
  error = false,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <MuiDateRangePicker
      value={value}
      open={open}
      onChange={onChange}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      disablePast
      mask="__.__.____"
      renderInput={(startProps, endProps) => {
        const startValue = startProps.inputProps.value;
        const endValue = endProps.inputProps.value;

        const startWidth = startValue ? 75 : 85;
        const endWidth = endValue ? 75 : 85;

        return (
          <div
            className={`mui-date-range-picker ${error ? "Mui-error" : ""}`}
            style={{ width: startWidth + endWidth + 80 + "px" }}
          >
            <TextField
              {...startProps}
              inputProps={{
                ...startProps.inputProps,
                readOnly: true,
                placeholder: "дд.мм.гггг",
              }}
              placeholder="дд.мм.гггг"
              helperText="dd.mm.yyyy"
              style={{ width: startWidth + "px" }}
            />
            <span style={{ margin: "0 5px" }}>–</span>
            <TextField
              {...endProps}
              inputProps={{
                ...endProps.inputProps,
                readOnly: true,
                placeholder: "дд.мм.гггг",
              }}
              placeholder="дд.мм.гггг"
              helperText="dd.mm.yyyy"
              style={{ width: endWidth + "px" }}
            />
            <IconButton
              // onFocus={startProps.inputProps.onFocus}
              // onBlur={startProps.inputProps.onBlur}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Event />
            </IconButton>
          </div>
        );
      }}
    />
  );
};

export default DateRangePicker;
