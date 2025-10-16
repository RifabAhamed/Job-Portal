import React, { useEffect, useState } from "react";
import AuthService from "../auth/AuthService.js";

const MyAccount = () => {
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error message

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getCurrentUser();
        setUser(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return <div className="text-center p-4">Loading user details...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

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
        </div>
      ) : (
        <p className="text-center text-gray-500">No user details found.</p>
      )}
    </div>
  );
};

export default MyAccount;
