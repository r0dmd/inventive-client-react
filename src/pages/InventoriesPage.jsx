import { useContext, useEffect } from 'react';
import { useInventories } from '../hooks/index.js';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// ------------------------------
const InventoriesPage = () => {
  const { authUser, authUserLoading } = useContext(AuthContext);
  const { inventories, inventoriesLoading, getInventories, deleteInventory } =
    useInventories();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUserLoading && !authUser) {
      toast.error('Unauthorized access');
      navigate('/');
    } else if (authUser) {
      getInventories();
    }
  }, [authUser, authUserLoading, navigate, getInventories]);

  const handleDelete = async (inventoryId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This inventory item will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteInventory(inventoryId);
      toast.success('Inventory deleted successfully');
    } catch (err) {
      toast.error('Failed to delete inventory: ' + err.message);
    }
  };

  if (authUserLoading || inventoriesLoading)
    return <p className="p-6">Loading...</p>;

  console.log(inventories);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventories</h1>

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
            {inventories?.map((inv) => (
              <tr key={inv.id}>
                <td className="border p-2">{inv.inventory}</td>
                <td className="border p-2">{inv.createdAt}</td>
                <td className="border p-2">{inv.modifiedAt || '-'}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(inv.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoriesPage;
