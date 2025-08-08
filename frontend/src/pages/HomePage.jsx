import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Avatar,
  Pagination,
} from "@mui/material";
import DiscussingImage from "../assets/images/DiscussingImage.jpg"; // Adjust the path as necessary
import JobSearchComponent from "../components/JobSearchComponent";
import { JobIcon } from "../assets/icons/JobIcon";
import { CandidatesIcon } from "../assets/icons/CandidatesIcon";
import { CompaniesIcon } from "../assets/icons/CompaniesIcon";
import JobCard from "../components/JobCard";
import jobs from "../data/JobsData.js"


const itemsPerPage = 6;

const HomePage = () => {

  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);

  const handleSeeAll = () => {
    setShowAll(true);
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const paginatedJobs = jobs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <Container maxWidth="" disableGutters sx={{ mt: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          py: 25,
          color: "primary.contrastText",
          backgroundImage: `url(${DiscussingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity here
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
            <JobSearchComponent />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 8, mt: 8 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primarygreen.main", width: 56, height: 56 }}
              >
                <JobIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ display: "block", fontWeight: "bold" }}
                >
                  25,850
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: "light" }}
                >
                  Jobs
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primarygreen.main", width: 56, height: 56 }}
              >
                <CandidatesIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ display: "block", fontWeight: "bold" }}
                >
                  10,250
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: "light" }}
                >
                  Candidates
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{ bgcolor: "primarygreen.main", width: 56, height: 56 }}
              >
                <CompaniesIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ display: "block", fontWeight: "bold" }}
                >
                  18,400
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: "light" }}
                >
                  Companies
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 6, px: {xs:1, md:6 }}}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Recent Jobs Available
        </Typography>
        <Box>
          <Box display="flex" flexDirection="column" gap={1}>
            {(showAll ? paginatedJobs : jobs.slice(0, 3)).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </Box>

          {!showAll ? (
            <Box mt={2} textAlign="center">
              <Button variant="contained" onClick={handleSeeAll}>
                See All
              </Button>
            </Box>
          ) : (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(jobs.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
          py: 6,
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to take the next step?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Create an Account
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
