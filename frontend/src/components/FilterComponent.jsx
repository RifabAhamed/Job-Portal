// import React from 'react'

// const FilterComponent = () => {
    
//   return (
//     <Box sx={{ padding: "30px", width: "380px" }}>
//       <Box
//         sx={{
//           borderRadius: "10px",
//           backgroundColor: "lightgreen.main",
//           padding: "20px",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Search by Job Title
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//                 backgroundColor: "white",
//                 fontSize: "14px",
//               },
//             }}
//             placeholder="Job title or company"
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//             variant="outlined"
//             size="small"
//           />
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Location
//           </Typography>
//           <Select
//             variant="outlined"
//             value={age}
//             onChange={handleChange}
//             inputProps={{ "aria-label": "Without label" }}
//             size="small"
//             sx={{
//               fontSize: "14px",
//               borderRadius: "12px",
//               "& .MuiSelect-select": {
//                 backgroundColor: "white",
//                 width: "100%",
//                 borderRadius: "12px",
//                 color: "text.gray",
//               },
//             }}
//           >
//             <MenuItem value={10}>Ten</MenuItem>
//             <MenuItem value={20}>Twenty</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Category
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   size="small"
//                   sx={{
//                     color: "text.gray",
//                     "&.Mui-checked": {
//                       color: "primarygreen.main",
//                     },
//                   }}
//                 />
//               }
//               label="Label"
//               sx={{
//                 "& .MuiFormControlLabel-label": {
//                   fontSize: "14px",
//                 },
//               }}
//               // onChange={handleChangeCategory}
//               // checked={checked}
//             />
//             <Typography sx={{ color: "text.gray" }} variant="body2">
//               10
//             </Typography>
//           </Box>

//           <Button
//             onClick={openCategories}
//             color="primarygreen"
//             sx={{ fontSize: "14px", textTransform: "none" }}
//           >
//             Show more...
//           </Button>
//           <Modal
//             open={open}
//             onClose={closeCategories}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 Text in a modal
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//               </Typography>
//             </Box>
//           </Modal>
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Job Type
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   size="small"
//                   sx={{
//                     color: "text.gray",
//                     "&.Mui-checked": {
//                       color: "primarygreen.main",
//                     },
//                   }}
//                 />
//               }
//               label="Label"
//               sx={{
//                 "& .MuiFormControlLabel-label": {
//                   fontSize: "14px",
//                 },
//               }}
//               // onChange={handleChangeCategory}
//               // checked={checked}
//             />
//             <Typography sx={{ color: "text.gray" }} variant="body2">
//               10
//             </Typography>
//           </Box>
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Experience Level
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   size="small"
//                   sx={{
//                     color: "text.gray",
//                     "&.Mui-checked": {
//                       color: "primarygreen.main",
//                     },
//                   }}
//                 />
//               }
//               label="Label"
//               sx={{
//                 "& .MuiFormControlLabel-label": {
//                   fontSize: "14px",
//                 },
//               }}
//               // onChange={handleChangeCategory}
//               // checked={checked}
//             />
//             <Typography sx={{ color: "text.gray" }} variant="body2">
//               10
//             </Typography>
//           </Box>
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Date Posted
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   size="small"
//                   sx={{
//                     color: "text.gray",
//                     "&.Mui-checked": {
//                       color: "primarygreen.main",
//                     },
//                   }}
//                 />
//               }
//               label="Label"
//               sx={{
//                 "& .MuiFormControlLabel-label": {
//                   fontSize: "14px",
//                 },
//               }}
//               // onChange={handleChangeCategory}
//               // checked={checked}
//             />
//             <Typography sx={{ color: "text.gray" }} variant="body2">
//               10
//             </Typography>
//           </Box>
//         </FormControl>
//         <FormControl variant="standard" sx={{ mb: 2 }}>
//           <Typography fontWeight="bold" variant="body2">
//             Salary Range
//           </Typography>
//           <Box sx={{ width: "100%" }}>
//             <Slider
//               size="small"
//               getAriaLabel={() => "Temperature range"}
//               value={value}
//               onChange={changeSalary}
//               valueLabelDisplay="auto"
//               getAriaValueText={valuetext}
//               color="primarygreen"
//             />
//           </Box>
//         </FormControl>
//       </Box>
//     </Box>
//   );
// }

// export default FilterComponent