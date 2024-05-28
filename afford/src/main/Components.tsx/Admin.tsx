import React, { useEffect, useState } from "react";
interface user {
  id: number;
  email: string;
}
interface UsersData {
  onlineUsers: user[];
  offlineUsers: user[];
  awayUsers: user[];
}
const Admin: React.FC = () => {
  const [usersData, setUsersData] = useState<UsersData>({
    onlineUsers: [],
    offlineUsers: [],
    awayUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/checkUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        //hi
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className=" min-h-screen overflow-hidden flex justify-center items-center text-center mt-5 text-red-600">
        Start the backend server bhaiya !!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Online Users -
          <span className="text-green-700">
            {" "}
            {usersData.onlineUsers.length}{" "}
          </span>
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                ID
              </th>
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.onlineUsers.length === 0 ? (
              <tr className="text-center">
                <td colSpan={2} className="py-3 px-5 border-b">
                  No one Online
                </td>
              </tr>
            ) : (
              usersData.onlineUsers.map((user) => (
                <tr key={user.id} className="text-center hover:bg-gray-100">
                  <td className="py-3 px-5 border-b">{user.id}</td>
                  <td className="py-3 px-5 border-b">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Offline Users -{" "}
          <span className="text-red-700">{usersData.offlineUsers.length}</span>
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                ID
              </th>
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.offlineUsers.length === 0 ? (
              <tr className="text-center">
                <td colSpan={2} className="py-3 px-5 border-b">
                  All are online or away
                </td>
              </tr>
            ) : (
              usersData.offlineUsers.map((user) => (
                <tr key={user.id} className="text-center hover:bg-gray-100">
                  <td className="py-3 px-5 border-b">{user.id}</td>
                  <td className="py-3 px-5 border-b">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Away Users -{" "}
          <span className="text-yellow-700">
            {" "}
            {usersData.awayUsers.length}{" "}
          </span>
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                ID
              </th>
              <th className="py-3 px-5 border-b text-left text-sm font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.awayUsers.length === 0 ? (
              <tr className="text-center">
                <td colSpan={2} className="py-3 px-5 border-b">
                  May be online or offline
                </td>
              </tr>
            ) : (
              usersData.awayUsers.map((user) => (
                <tr key={user.id} className="text-center hover:bg-gray-100">
                  <td className="py-3 px-5 border-b">{user.id}</td>
                  <td className="py-3 px-5 border-b">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
