import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActiveUsers = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    console.log(storedUser);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      if (response.ok) {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/login");
      } else {
        console.log("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="w-full  h-96 flex justify-center items-center   text-slate-900">
      {currentUser ? (
        <div className="flex items-center">
          <p className="mr-2">Welcome, {currentUser.email}</p>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No active user</p>
      )}
    </div>
  );
};

export default ActiveUsers;
