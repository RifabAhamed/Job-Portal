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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CompanyService from "../company/CompanyService.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    companyId: null,
    companyName: "",
  });
  const [deleting, setDeleting] = useState(false);

  const fetchEmployerCompanies = async (newPage = page, newLimit = limit) => {
    try {
      setLoading(true);
      setError("");

      // Fetch companies created by the employer
      const res = await CompanyService.getMyCompaniesPaginated({
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
    fetchEmployerCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDeleteDialog = (companyId, companyName) => {
    setDeleteDialog({
      open: true,
      companyId,
      companyName,
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      companyId: null,
      companyName: "",
    });
  };

  const handleDeleteCompany = async () => {
    if (!deleteDialog.companyId) return;

    try {
      setDeleting(true);
      await CompanyService.deleteCompany(deleteDialog.companyId);
      setCompanies(companies.filter((c) => c._id !== deleteDialog.companyId));
      handleCloseDeleteDialog();
      // Show success message
      alert("Company deleted successfully");
    } catch (err) {
      alert(
        typeof err === "string"
          ? err
          : "Failed to delete company. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
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
          maxWidth: 1200,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        {/* Header with Title and Create Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            My Companies
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/createCompany")}
          >
            Create New Company
          </Button>
        </Box>

        {loading && (
          <Box sx={{ textAlign: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && companies.length > 0 && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell fontWeight="bold">Company Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Industry</TableCell>
                    <TableCell>Company Size</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company._id} hover>
                      <TableCell fontWeight="500">{company.name}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 250,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company.description || "N/A"}
                      </TableCell>
                      <TableCell>{company.location || "N/A"}</TableCell>
                      <TableCell>{company.industry || "-"}</TableCell>
                      <TableCell>{company.companySize || "-"}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Profile">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate(`/companyProfile/${company._id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() =>
                              navigate(`/editCompany/${company._id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              handleOpenDeleteDialog(company._id, company.name)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              You have not created any companies yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/createCompany")}
            >
              Create Your First Company
            </Button>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.companyName}</strong>? This action cannot be
            undone and will also delete all associated jobs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleDeleteCompany}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployerDashboard;
