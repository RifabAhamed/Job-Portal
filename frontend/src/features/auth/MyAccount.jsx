import React, {useState } from "react";
import AuthService from "../auth/AuthService.js";
import { useAuth } from "../../context/AuthContext";

const MyAccount = () => {
  
  const { user, setUser } = useAuth();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");



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

      // response = { url, public_id }
      const uploadedUrl = response.url;

      if (!uploadedUrl) {
        setUploadMsg("Upload failed: No URL returned.");
        return;
      }

      setUploadMsg("Resume uploaded successfully!");

      // Update user resume in state
      setUser((prev) => ({
        ...prev,
        resume: {
          url: uploadedUrl,
          public_id: response.public_id,
        },
      }));
    } catch (err) {
      setUploadMsg(err);
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

          {user?.resume?.url && (
            <a
              href={user.resume.url}
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

      {/* Upload Resume */}
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
    </div>
  );
};

export default MyAccount;
