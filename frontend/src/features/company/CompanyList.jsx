import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import CompanyService from "../company/CompanyService.js";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅

  const fetchCompanies = async (newPage = page, newLimit = limit) => {
    try {
      setLoading(true);
      setError("");

      const res = await CompanyService.getAllCompaniesPaginated({
        page: newPage + 1,
        limit: newLimit,
      });

      if (res?.data?.companies) {
        setCompanies(res.data.companies);
        setTotal(res.data.total || 0);
      } else {
        setCompanies([]);
        setTotal(0);
      }
    } catch (err) {
      setError(err?.toString() || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Companies
        </Typography>

        {loading && (
          <Box sx={{ textAlign: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && companies.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Industry</TableCell>
                    <TableCell>Company Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow
                      key={company._id}
                      hover
                      sx={{ cursor: "pointer" }} // 👆 makes row clickable
                      onClick={() => navigate(`/companyProfile/${company._id}`)}
                    >
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.description}</TableCell>
                      <TableCell>{company.location || "N/A"}</TableCell>
                      <TableCell>{company.industry || "-"}</TableCell>
                      <TableCell>{company.companySize || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </>
        )}

        {!loading && companies.length === 0 && !error && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            No companies found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CompanyList;
