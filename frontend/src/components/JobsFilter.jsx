import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { SearchIcon } from "../assets/icons/SearchIcon"; // Adjust path as needed

const JobsFilter = ({
  filters,
  setFilters,
  clearFilters,
  closeFilters,
  isSmScreen,
}) => {
  // Handle Text Inputs (Search, Location)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  // Handle Checkboxes (Job Type, Experience)
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const currentList = prev[category] || [];
      let newList;
      if (checked) {
        newList = [...currentList, value];
      } else {
        newList = currentList.filter((item) => item !== value);
      }
      return { ...prev, [category]: newList, page: 1 };
    });
  };

  // Handle Salary Slider
  const handleSalaryChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: newValue,
      page: 1,
    }));
  };

  return (
    <Box sx={{ padding: "10px", width: { xs: "100%", md: "350px" } }}>
      {isSmScreen && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button onClick={closeFilters}>
            <CancelIcon color="primary" />
          </Button>
        </Box>
      )}

      <Box
        sx={{
          borderRadius: "10px",
          backgroundColor: "#f5f5f5", // Light gray background
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold" variant="h6">
            Filters
          </Typography>
          <Button
            size="small"
            onClick={clearFilters}
            sx={{ textTransform: "none" }}
          >
            Reset
          </Button>
        </Box>

        {/* --- Search --- */}
        <FormControl fullWidth>
          <Typography fontWeight="bold" variant="body2" mb={1}>
            Search
          </Typography>
          <TextField
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Title or Company"
            size="small"
            sx={{ bgcolor: "white", borderRadius: "8px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        {/* --- Location --- */}
        <FormControl fullWidth>
          <Typography fontWeight="bold" variant="body2" mb={1}>
            Location
          </Typography>
          <TextField
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="e.g. Colombo"
            size="small"
            sx={{ bgcolor: "white", borderRadius: "8px" }}
          />
        </FormControl>

        {/* --- Job Type (Checkbox Group) --- */}
        <FormControl component="fieldset">
          <Typography fontWeight="bold" variant="body2" mb={1}>
            Job Type
          </Typography>
          {["full-time", "part-time", "contract", "internship"].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.jobType.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "jobType")}
                  value={type}
                  size="small"
                  sx={{ color: "text.secondary" }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {type}
                </Typography>
              }
            />
          ))}
        </FormControl>

        {/* --- Experience Level --- */}
        <FormControl component="fieldset">
          <Typography fontWeight="bold" variant="body2" mb={1}>
            Experience Level
          </Typography>
          {["Entry Level", "Mid Level", "Senior"].map((level) => (
            <FormControlLabel
              key={level}
              control={
                <Checkbox
                  checked={filters.experienceLevel.includes(level)}
                  onChange={(e) => handleCheckboxChange(e, "experienceLevel")}
                  value={level}
                  size="small"
                  sx={{ color: "text.secondary" }}
                />
              }
              label={<Typography variant="body2">{level}</Typography>}
            />
          ))}
        </FormControl>

        {/* --- Salary Range --- */}
        <Box>
          <Typography fontWeight="bold" variant="body2" gutterBottom>
            Salary Range
          </Typography>
          <Slider
            value={filters.salaryRange}
            onChange={handleSalaryChange}
            valueLabelDisplay="auto"
            min={0}
            max={500000} // Adjust based on your data
            step={5000}
            size="small"
            sx={{ color: "primary.main" }}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              {filters.salaryRange[0].toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {filters.salaryRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsFilter;
