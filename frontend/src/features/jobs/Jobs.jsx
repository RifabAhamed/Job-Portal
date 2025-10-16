import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import JobPic from "../../assets/images/JobPic.jpg";
import { SearchIcon } from "../../assets/icons/SearchIcon.jsx";
import JobsData from "../../data/JobsData.js";
import JobCard from "../../components/JobCard.jsx";
import { useTheme, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import JobService from "./JobService.js";

// inside your component:

const Jobs = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(6);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [age, setAge] = useState("10");
  const [open, setOpen] = useState(false);
  const [Filters, setFilters] = useState(false);
  const [value, setValue] = useState([20, 37]);


  // const handleChangeSort = (event) => setAge(event.target.value);
  // const handleSalaryChange = (event, newValue) => setSalaryRange(newValue);
  const handlePageChange = (event, value) => setPage(value);
  const itemsPerPage = 6;

 const fetchJobs = async (newPage = page) => {
   try {
    //  setLoading(true);
     setError("");

     const res = await JobService.getAllJobsPaginated({
       page: newPage,
       limit,
     });

     if (res?.data?.jobs) {
       setJobs(res.data.jobs);
       setTotal(res.data.total || 0);
       console.log(res.data.jobs);
       
     } else {
       setJobs([]);
       setTotal(0);
     }
   } catch (err) {
     setError(err?.toString() || "Failed to fetch jobs");
   } finally {
    //  setLoading(false);
   }
 };

 useEffect(() => {
   fetchJobs(page);
 }, [page]);

  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const [Filters, setFilters] = React.useState(false);

  const openFilters = () => setFilters(true);
  const closeFilters = () => setFilters(false);

  const openCategories = () => setOpen(true);
  const closeCategories = () => setOpen(false);

  // const [value, setValue] = React.useState([20, 37]);

  const changeSalary = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const FilterComponent = () => {
    return (
      <Box sx={{ padding: "10px", width: { xs: "100%", md: "350px" } }}>
        {isSmScreen && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={closeFilters}>
              <CancelIcon color="primarygreen" />
            </Button>
          </Box>
        )}

        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "lightgreen.main",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Search by Job Title
            </Typography>
            <TextField
              id="outlined-basic"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "white",
                  fontSize: "14px",
                },
              }}
              placeholder="Job title or company"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              size="small"
            />
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Location
            </Typography>
            <Select
              variant="outlined"
              value={age}
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              sx={{
                fontSize: "14px",
                borderRadius: "12px",
                "& .MuiSelect-select": {
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "12px",
                  color: "text.gray",
                },
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Category
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "text.gray",
                      "&.Mui-checked": {
                        color: "primarygreen.main",
                      },
                    }}
                  />
                }
                label="Label"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                // onChange={handleChangeCategory}
                // checked={checked}
              />
              <Typography sx={{ color: "text.gray" }} variant="body2">
                10
              </Typography>
            </Box>

            <Button
              onClick={openCategories}
              color="primarygreen"
              sx={{ fontSize: "14px", textTransform: "none" }}
            >
              Show more...
            </Button>
            <Modal
              open={open}
              onClose={closeCategories}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Job Type
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "text.gray",
                      "&.Mui-checked": {
                        color: "primarygreen.main",
                      },
                    }}
                  />
                }
                label="Label"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                // onChange={handleChangeCategory}
                // checked={checked}
              />
              <Typography sx={{ color: "text.gray" }} variant="body2">
                10
              </Typography>
            </Box>
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Experience Level
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "text.gray",
                      "&.Mui-checked": {
                        color: "primarygreen.main",
                      },
                    }}
                  />
                }
                label="Label"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                // onChange={handleChangeCategory}
                // checked={checked}
              />
              <Typography sx={{ color: "text.gray" }} variant="body2">
                10
              </Typography>
            </Box>
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Date Posted
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "text.gray",
                      "&.Mui-checked": {
                        color: "primarygreen.main",
                      },
                    }}
                  />
                }
                label="Label"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                // onChange={handleChangeCategory}
                // checked={checked}
              />
              <Typography sx={{ color: "text.gray" }} variant="body2">
                10
              </Typography>
            </Box>
          </FormControl>
          <FormControl variant="standard" sx={{ mb: 2 }}>
            <Typography fontWeight="bold" variant="body2">
              Salary Range
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Slider
                size="small"
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={changeSalary}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="primarygreen"
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
    );
  };

  // const [checked, setChecked] = React.useState(true);

  // const handleChangeCategory = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <Container maxWidth="" disableGutters sx={{ mt: 0 }}>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          backgroundImage: `url(${JobPic})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center calc(-100px)",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // adjust 0.5 to make lighter/darker
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        {isSmScreen ? (
          <>
            <Button
              variant="contained"
              color="primarygreen"
              sx={{ m: 2 }}
              onClick={openFilters}
            >
              Filters
            </Button>
            <Modal
              open={Filters}
              onClose={closeFilters}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ overflowY: "auto", padding: "10px", width: "100%" }}>
                <Box sx={{ height: "90vh" }}>
                  <FilterComponent />
                </Box>
              </Box>
            </Modal>
          </>
        ) : (
          <FilterComponent />
        )}

        <Box sx={{ width: "100%", padding: "10px" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: { xs: 2 },
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography color="text.gray" variant="subtitle1">
                Showing 10 of 100 jobs
              </Typography>
              <Select
                variant="outlined"
                value={age}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                // width="150px"
                sx={{
                  borderRadius: "12px",
                  "& .MuiSelect-select": {
                    backgroundColor: "white",
                    width: "150px",
                    borderRadius: "12px",
                    color: "text.gray",
                  },
                }}
              >
                <MenuItem value={10}>Sort by latest</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box>
            <Box>
              <Box display="flex" flexDirection="column" gap={1}>
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </Box>
              <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(JobsData.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Jobs;
