import { useEffect, useState } from "react";
import useInventories from "../hooks/useInventories";
import type { Inventory } from "../hooks/useInventories"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "sonner";
import Swal from "sweetalert2";

const InventoriesPage = () => {
  const { authUser, authUserLoading } = useAuth();
  const {
    inventories,
    inventoriesLoading,
    getInventories,
    addInventory,
    updateInventory,
    deleteInventory,
  } = useInventories();

  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!authUserLoading && !authUser) {
      toast.error("Unauthorized access");
      navigate("/");
    } else if (authUser) {
      getInventories();
    }
  }, [authUser, authUserLoading, navigate, getInventories]);

  const handleEdit = (inventoryId: string, currentName: string) => {
    setEditingId(inventoryId);
    setEditedName(currentName);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
  };

  const handleSave = async (inventoryId: string) => {
    try {
      await updateInventory(inventoryId, { name: editedName });
      await getInventories();
      setEditingId(null);
      setEditedName("");
      toast.success("Inventory updated");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (inventoryId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This inventory item will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteInventory(inventoryId);
      toast.success("Inventory deleted successfully");
    } catch (err: any) {
      toast.error(`Failed to delete inventory: ${err.message}`);
    }
  };

  const handleAdd = async () => {
    const result = await Swal.fire({
      title: "New Inventory",
      input: "text",
      inputLabel: "Inventory Name",
      inputPlaceholder: "Enter name",
      showCancelButton: true,
    });

    if (!result.isConfirmed || !result.value?.trim()) return;

    try {
      const formData = new FormData();
      formData.append("name", result.value.trim());
      await addInventory(formData);
      await getInventories();
      toast.success("Inventory added");
    } catch (err: any) {
      toast.error(`Failed to add inventory: ${err.message}`);
    }
  };

  if (authUserLoading || inventoriesLoading)
    return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventories</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Inventory
        </button>
      </div>

      {inventories?.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Created at</th>
              <th className="border p-2 text-left">Modified at</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inv: Inventory, index: number) => {
              const isEditing = editingId === inv.id;

              return (
                <tr key={inv.id || `temp-${index}`}>
                  <td className="border p-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      inv.name
                    )}
                  </td>
                  <td className="border p-2">{"-"}</td>
                  <td className="border p-2">{"-"}</td>
                  <td className="border p-2 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(inv.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(inv.id, inv.name)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigate(`/inventories/${inv.id}/products`)}
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                        >
                          View Products
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoriesPage;
