import React from "react";
import { MenuItem, Select as MuiSelect } from "@material-ui/core";
import {
  SelectMenuItemType,
  SelectProps,
} from "@order-certificate-types/inputs";
import { KeyboardArrowDown } from "@material-ui/icons";

const Select = React.forwardRef(
  (
    {
      value,
      onChange,
      items,
      placeholder = "Выберите значение",
      ...rest
    }: SelectProps,
    ref
  ) => (
    <MuiSelect
      variant="outlined"
      {...rest}
      ref={ref}
      value={value}
      onChange={onChange}
      className="mui-select"
      displayEmpty
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        getContentAnchorEl: null,
        className: "mui-select-dropdown",
      }}
      IconComponent={KeyboardArrowDown}
      renderValue={(selectedValue) => {
        const selectedItem = items.find((item) => item.Id === selectedValue);

        return (
          <span style={{ color: selectedItem?.Title ? "inherit" : "#A6A6A6" }}>
            {selectedItem?.Title ?? placeholder}
          </span>
        );
      }}
    >
      {!!items?.length &&
        items.map(({ Id, Title }: SelectMenuItemType, index) => (
          <MenuItem key={index} value={Id}>
            {Title}
          </MenuItem>
        ))}
    </MuiSelect>
  )
);

export default Select;
