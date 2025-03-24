import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';

const yearRanges = [
  { label: "1970 - 1989", start: 1970, end: 1989 },
  { label: "1990 - 1999", start: 1990, end: 1999 },
  { label: "2000 - 2009", start: 2000, end: 2009 },
  { label: "2010 - 2019", start: 2010, end: 2019 },
  { label: "2020 - 2025", start: 2020, end: 2025 }
];

const YearFilterSelect = ({ value, onChange }) => {
  const handleSelect = (e) => {
    const newVal = e.target.value;
    console.log("YearFilterSelect - selected value:", newVal); 
    onChange(newVal);
  };

  const menuItems = [];
  menuItems.push(
    <MenuItem key="allYears" value="allYears">
      <em>All Years</em>
    </MenuItem>
  );

  yearRanges.forEach((range) => {
    menuItems.push(
      <ListSubheader key={`header-${range.label}`}>{range.label}</ListSubheader>,
      <MenuItem key={`${range.label}-all`} value={`${range.start}|all`}>
        <em>All</em>
      </MenuItem>
    );
    for (let y = range.start; y <= range.end; y++) {
      menuItems.push(
        <MenuItem key={y} value={`${range.start}|${y}`}>
          {y}
        </MenuItem>
      );
    }
  });

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Year</InputLabel>
      <Select
        label="Year"
        value={value}
        onChange={handleSelect}
        MenuProps={{
          PaperProps: { sx: { maxHeight: 300 } }
        }}
      >
        <MenuItem value="">
          <em>No Filter</em>
        </MenuItem>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default YearFilterSelect;
