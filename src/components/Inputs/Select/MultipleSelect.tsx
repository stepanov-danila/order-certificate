import React from "react";
import { MenuItem, Select as MuiSelect } from "@material-ui/core";
import {
  MultipleSelectProps,
  SelectMenuItemType,
} from "@order-certificate-types/inputs";
import { Close, KeyboardArrowDown } from "@material-ui/icons";

const MultipleSelectItem = ({ text, onClick }) => (
  <div className="myl-multiple-select-item">
    <p className="myl-multiple-select-item__text">{text}</p>
    <div
      className="myl-multiple-select-item__delete"
      onClick={onClick}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <Close />
    </div>
  </div>
);

const MultipleSelect = React.forwardRef(
  (
    {
      value,
      onChange,
      items,
      placeholder = "Выберите значение",
      ...rest
    }: MultipleSelectProps,
    ref
  ) => {
    const handleDeleteSelectedItem = (event, value, selectedValue) => {
      event.stopPropagation();

      onChange(selectedValue.filter((item) => item !== value));
    };

    return (
      <MuiSelect
        variant="outlined"
        {...rest}
        ref={ref}
        value={value}
        onChange={onChange}
        multiple
        displayEmpty
        className="mui-select myl-multiple-select"
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
        renderValue={(selectedValue: any[]) => {
          if (selectedValue.length === 0) {
            return (
              <span style={{ color: "#A6A6A6", lineHeight: "40px" }}>
                {placeholder}
              </span>
            );
          }

          const renderValues = [];

          items.forEach((item) => {
            if (selectedValue.includes(item.Id)) {
              renderValues.push(item);
            }
          });

          return (
            <div className="myl-multiple-select-list">
              {renderValues.map((value, index) => (
                <MultipleSelectItem
                  key={index}
                  text={value!.Title}
                  onClick={(event) => {
                    handleDeleteSelectedItem(event, value!.Id, selectedValue);
                  }}
                />
              ))}
            </div>
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
    );
  }
);

export default MultipleSelect;
