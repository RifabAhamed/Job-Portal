import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { JobIcon } from "../assets/icons/JobIcon";

const JobSearchComponent = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mt: 2,
        width: "100%",
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <FormControl sx={{ width: { xs: "90%", md: "40%" } }}>
        <TextField
          id="outlined-basic"
          label="Job Title or Company Name"
          variant="outlined"
          sx={{
            bgcolor: "white",
            borderRadius: 0,
            borderStartEndRadius: { xs: 8, md: 0 },
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: { xs: 0, md: 8 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: { xs: 0, md: 8 },
            },
          }}
        />
      </FormControl>
      <FormControl sx={{ width: { xs: "90%", md: "20%" } }}>
        <InputLabel id="demo-simple-select-label">Select Location</InputLabel>
        <Select
          sx={{ height: "56px", bgcolor: "white", borderRadius: 0 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: { xs: "90%", md: "20%" } }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          sx={{ height: "56px", bgcolor: "white", borderRadius: 0 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        color="primarygreen"
        sx={{
          textTransform: "none",
          height: "56px",
          width: { xs: "90%", md: "20%" },
          borderRadius: 0,
          borderStartEndRadius: { xs: 0, md: 8 },
          borderEndEndRadius: 8,
          borderEndStartRadius: { xs: 8, md: 0 },
        }}
      >
        Search Job
      </Button>
    </Box>
  );
};

export default JobSearchComponent;
