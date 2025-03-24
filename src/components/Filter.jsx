import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Button,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import YearFilterSelect from './YearFilterSelect';

const FilterV2 = ({ onFilterChange, genres, platforms, tags, developers }) => {
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    platform: '',
    tag: [],
    developer: ''
  });

  const handleYearChange = (newValue) => {
    console.log("FilterV2 - Año seleccionado:", newValue);
    setFilters((prev) => ({ ...prev, year: newValue }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    let yearFilter = '';
    if (filters.year) {
      if (filters.year === 'allYears') {
        yearFilter = `1970-01-01,2023-12-31`;
      } else {
        const [rangeStart, selectedYear] = filters.year.split('|');
        const ranges = {
          "1970": { start: 1970, end: 1989 },
          "1990": { start: 1990, end: 1999 },
          "2000": { start: 2000, end: 2009 },
          "2010": { start: 2010, end: 2019 },
          "2020": { start: 2020, end: 2023 }
        };
        const rangeObj = ranges[rangeStart];
        if (selectedYear === 'all') {
          yearFilter = `${rangeObj.start}-01-01,${rangeObj.end}-12-31`;
        } else {
          yearFilter = `${selectedYear}-01-01,${selectedYear}-12-31`;
        }
      }
    }
    console.log("Filtro de año formateado:", yearFilter);
    onFilterChange({
      ...filters,
      year: yearFilter
    });
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250
      }
    }
  };

  return (
    <Accordion elevation={3} sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Advanced Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Año */}
          <Grid item xs={12} sm={6} md={4}>
            <YearFilterSelect value={filters.year} onChange={handleYearChange} />
          </Grid>
          {/* Género */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Genre</InputLabel>
              <Select
                name="genre"
                value={filters.genre}
                label="Genre"
                onChange={handleChange}
                MenuProps={menuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genres &&
                  genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Plataforma */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Platform</InputLabel>
              <Select
                name="platform"
                value={filters.platform}
                label="Platform"
                onChange={handleChange}
                MenuProps={menuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {platforms &&
                  platforms.map((platform) => (
                    <MenuItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Tags - Selección múltiple */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Tags</InputLabel>
              <Select
                name="tag"
                multiple
                value={filters.tag}
                onChange={handleChange}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const tagObj = tags.find((t) => t.id.toString() === value);
                      return <Chip key={value} label={tagObj ? tagObj.name : value} />;
                    })}
                  </Box>
                )}
                MenuProps={menuProps}
              >
                {tags &&
                  tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id.toString()}>
                      {tag.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Desarrollador */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Developer</InputLabel>
              <Select
                name="developer"
                value={filters.developer}
                label="Developer"
                onChange={handleChange}
                MenuProps={menuProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {developers &&
                  developers.map((dev) => (
                    <MenuItem key={dev.id} value={dev.id}>
                      {dev.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Botón para aplicar los filtros */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleApply}>
                Apply Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterV2;
