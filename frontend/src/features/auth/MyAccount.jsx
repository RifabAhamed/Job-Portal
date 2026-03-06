import React, { useState, useEffect } from "react";
import AuthService from "../auth/AuthService.js";
import { useGetSavedJobsQuery } from "../../redux/api/savedJobsApi.js";
import { useAuth } from "../../context/AuthContext";
import JobCard from "../../components/JobCard.jsx";

const MyAccount = () => {
  const { user, setUser } = useAuth();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [resumeViewUrl, setResumeViewUrl] = useState(null);

  const {
    data: savedJobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetSavedJobsQuery(undefined, {
    skip: !user || user.role === "employer",
  });

  // Extract the array from the response
  const savedJobsList = savedJobsData?.data || [];
  
  useEffect(() => {
    const fetchSigned = async () => {
      if (!user?.resume?.public_id) return;
      try {
        const signed = await AuthService.getResume();
        setResumeViewUrl(signed?.url || null);
      } catch (err) {
        console.warn("Failed to fetch signed resume URL:", err);
      }
    };

    fetchSigned();
  }, [user]);

  // Select resume (PDF only)
  const handleResumeSelect = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setUploadMsg("Only PDF files are allowed!");
      return;
    }

    setResumeFile(file);
    setUploadMsg("");
  };

  // Upload Resume
  const handleResumeUpload = async () => {
    if (!resumeFile) {
      setUploadMsg("Please select a PDF file first.");
      return;
    }

    try {
      setUploading(true);

      const response = await AuthService.uploadResume(resumeFile);

      if (!response || !response.public_id) {
        setUploadMsg("Upload failed: No resume returned.");
        return;
      }

      setUploadMsg("Resume uploaded successfully!");
      setResumeFile(null);

      setUser((prev) => ({
        ...prev,
        resume: { url: response.url, public_id: response.public_id },
      }));

      try {
        const signed = await AuthService.getResume();
        setResumeViewUrl(signed?.url || null);
      } catch (err) {
        console.warn("Could not fetch signed resume URL after upload", err);
      }
    } catch (err) {
      console.error(err);
      setUploadMsg(err?.message || "Resume upload failed");
    } finally {
      setUploading(false);
    }
  };


  // if (loading)
  //   return <div className="text-center p-4">Loading user details...</div>;

  // if (error)
  //   return <div className="text-center text-red-600 p-4">{String(error)}</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Account</h2>

      {user ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {user.role && (
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          )}

          {(resumeViewUrl || user?.resume?.url) && (
            <a
              href={resumeViewUrl || user.resume.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline block mt-2"
            >
              View Uploaded Resume
            </a>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No user details found.</p>
      )}

      {/* Upload Resume - Only for Job Seekers */}
      {user?.role !== "employer" && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Upload Resume (PDF)</h3>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeSelect}
            className="border p-2 w-full rounded-md"
          />

          {resumeFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: <strong>{resumeFile.name}</strong>
            </p>
          )}

          <button
            onClick={handleResumeUpload}
            disabled={uploading}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>

          {uploadMsg && (
            <p className="text-center mt-3 text-green-700">{uploadMsg}</p>
          )}
        </div>
      )}

      {user?.role !== "employer" && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">My Saved Jobs</h3>

          {isJobsLoading ? (
            <div className="flex justify-center p-4">
              {/* You can replace this with your MUI CircularProgress if you prefer */}
              <p className="text-gray-500">Loading saved jobs...</p>
            </div>
          ) : isJobsError ? (
            <p className="text-red-500 text-center">
              Failed to load saved jobs.
            </p>
          ) : savedJobsList.length === 0 ? (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
              You have not saved any jobs yet. Browse jobs to save them here!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {savedJobsList.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import AuthService from "../auth/AuthService.js";
// import { supabase } from "../../config/supabaseClient.js"

// const MyAccount = () => {
//   const { user, setUser } = useAuth();

//   const [resumeFile, setResumeFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadMsg, setUploadMsg] = useState("");
//   const [resumeViewUrl, setResumeViewUrl] = useState(null);

//   // 2. EFFECT: Fetch a Signed URL if the user already has a resume path
//   useEffect(() => {
//     const fetchSignedUrl = async () => {
//       // We assume user.resume stores the Storage Path (e.g., "user_123/17584_resume.pdf")
//       if (user && user.resume) {
//         try {
//           const { data, error } = await supabase.storage
//             .from("job-portal-resume") // Your bucket name
//             .createSignedUrl(user.resume, 3600); // Valid for 1 hour (3600s)

//           if (data) {
//             setResumeViewUrl(data.signedUrl);
//           }
//           if (error) console.error("Error fetching resume URL:", error);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     };

//     fetchSignedUrl();
//   }, [user]);

//   // 3. Select resume (PDF only)
//   const handleResumeSelect = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type !== "application/pdf") {
//       setUploadMsg("Only PDF files are allowed!");
//       return;
//     }
//     setResumeFile(file);
//     setUploadMsg("");
//   };

//   // 4. Upload Resume
//   const handleResumeUpload = async () => {
//     if (!resumeFile) {
//       setUploadMsg("Please select a PDF file first.");
//       return;
//     }

//     try {
//       setUploading(true);
//       setUploadMsg("Uploading to storage...");

//       const userId = user._id || user.id;
//       const filePath = `${userId}/${Date.now()}_resume.pdf`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("job-portal-resume")
//         .upload(filePath, resumeFile);

//       if (uploadError) throw uploadError;

//       const resumePath = uploadData.path; // This is the string we save to DB
//       console.log("Uploaded to Supabase at path:", resumePath);

//       await AuthService.updateUserResume(userId, resumePath);

//       setUploadMsg("Resume uploaded successfully!");

//       // D. Generate a new Signed URL immediately so the UI updates
//       const { data: urlData } = await supabase.storage
//         .from("job-portal-resume")
//         .createSignedUrl(resumePath, 3600);

//       // E. Update Local State
//       setUser((prev) => ({
//         ...prev,
//         resume: resumePath, // Update the path in user object
//       }));

//       setResumeViewUrl(urlData?.signedUrl); // Update the view link
//       setResumeFile(null); // Clear input
//     } catch (err) {
//       console.error(err);
//       setUploadMsg(`Upload failed: ${err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">My Account</h2>

//       {user ? (
//         <div className="space-y-2">
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           {user.role && (
//             <p>
//               <strong>Role:</strong> {user.role}
//             </p>
//           )}

//           {/* VIEW RESUME LINK */}
//           {resumeViewUrl ? (
//             <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
//               <p className="text-sm text-gray-600 mb-1">Current Resume:</p>
//               <a
//                 href={resumeViewUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 font-medium hover:underline flex items-center gap-2"
//               >
//                 📄 View My Resume
//               </a>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400 mt-2">
//               No resume uploaded yet.
//             </p>
//           )}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No user details found.</p>
//       )}

//       {/* Upload Resume Section */}
//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Update Resume</h3>

//         <label className="block text-sm text-gray-700 mb-1">
//           Select PDF File
//         </label>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleResumeSelect}
//           className="block w-full text-sm text-gray-500
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-50 file:text-blue-700
//             hover:file:bg-blue-100 mb-2"
//         />

//         {resumeFile && (
//           <p className="mb-2 text-sm text-gray-600">
//             Selected: <strong>{resumeFile.name}</strong>
//           </p>
//         )}

//         <button
//           onClick={handleResumeUpload}
//           disabled={uploading || !resumeFile}
//           className={`mt-2 w-full text-white py-2 rounded-md transition-colors
//             ${
//               uploading || !resumeFile
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//         >
//           {uploading ? "Uploading..." : "Upload Resume"}
//         </button>

//         {uploadMsg && (
//           <p
//             className={`text-center mt-3 text-sm font-medium ${
//               uploadMsg.includes("failed") ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {uploadMsg}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAccount;
