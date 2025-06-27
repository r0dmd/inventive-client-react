import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/useAuth";
import { toast } from "sonner";
import Swal from "sweetalert2";

const { VITE_API_URL } = import.meta.env;

interface User {
  id: number | string;
  username: string;
  role: string;
  createdAt: string;
  modifiedAt?: string | null;
}

const UserAdminPage: React.FC = () => {
  const { authToken, authUser, authUserLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUserLoading) {
      if (!authUser || authUser.role !== "admin") {
        toast.error("Unauthorized access");
        navigate("/");
      }
    }
  }, [authUser, authUserLoading, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/users`, {
          method: "GET",
          headers: {
            Authorization: authToken || "",
          },
        });

        const body = await res.json();
        if (body.status === "error") throw new Error(body.message);

        setUsers(body.data.users);
      } catch (err: any) {
        toast.error(`Error fetching users: ${err.message || err}`);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (authUser?.role === "admin") {
      fetchUsers();
    }
  }, [authUser, authToken]);

  const handleDeactivate = async (userId: number | string, username: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, deactivate ${username}`,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${VITE_API_URL}/users/${userId}/deactivate`, {
        method: "DELETE",
        headers: {
          Authorization: authToken || "",
        },
      });

      const body = await res.json();
      if (body.status === "error") throw new Error(body.message);

      toast.success("User deactivated");
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (err: any) {
      toast.error(`Failed to deactivate user: ${err.message || err}`);
    }
  };

  if (authUserLoading || loadingUsers) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User management</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Created at</th>
              <th className="border p-2 text-left">Modified at</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.username}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">{u.createdAt}</td>
                <td className="border p-2">{u.modifiedAt || "-"}</td>
                <td className="border p-2">
                  {u.role === "admin" ? (
                    <p>Admin users can't be deactivated</p>
                  ) : (
                    <button
                      onClick={() => handleDeactivate(u.id, u.username)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAdminPage;
