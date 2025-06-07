import { useCallback, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext.js';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const useInventories = () => {
  const { authToken } = useContext(AuthContext);

  const [inventories, setInventories] = useState([]);
  const [inventoriesLoading, setInventoriesLoading] = useState(false);

  const getInventories = useCallback(async () => {
    try {
      setInventoriesLoading(true);

      const res = await fetch(`${VITE_API_URL}/inventories`, {
        method: 'GET',
        headers: { Authorization: authToken },
      });

      const body = await res.json();
      if (body.status === 'error') throw new Error(body.message);

      setInventories(body.data.inventories);
      return body.data.inventories;
    } catch (err) {
      console.error('Error fetching inventories:', err);
      toast.error('Error fetching inventories');
      throw err;
    } finally {
      setInventoriesLoading(false);
    }
  }, [authToken]);

  const addInventory = useCallback(
    async (inventoryData) => {
      try {
        setInventoriesLoading(true);

        const res = await fetch(`${VITE_API_URL}/inventories/new`, {
          method: 'POST',
          headers: {
            Authorization: authToken,
            // Don't set Content-Type here because inventoryData is FormData
          },
          body: inventoryData,
        });

        const body = await res.json();

        if (!res.ok || body.status === 'error') {
          throw new Error(body.message || 'Failed to add inventory');
        }

        // Add the new inventory item to state
        // Assuming backend returns new inventory info in body.data or similar
        // Adjust if your backend response differs
        setInventories((prev) => [...prev, body.data || {}]);

        return body;
      } catch (err) {
        console.error('Error adding inventory:', err);
        toast.error('Error adding inventory');
        throw err;
      } finally {
        setInventoriesLoading(false);
      }
    },
    [authToken]
  );

  const updateInventory = useCallback(
    async (inventoryId, updateData) => {
      try {
        setInventoriesLoading(true);

        const res = await fetch(
          `${VITE_API_URL}/inventories/${inventoryId}/update`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
            },
            body: JSON.stringify(updateData),
          }
        );

        const body = await res.json();

        if (!res.ok || body.status === 'error') {
          throw new Error(body.message || 'Failed to update inventory');
        }

        // Update the local state with updated inventory
        setInventories((prev) =>
          prev.map((inv) =>
            inv.id === inventoryId ? { ...inv, ...body.data } : inv
          )
        );

        return body;
      } catch (err) {
        toast.error('Error updating inventory');
        throw err;
      } finally {
        setInventoriesLoading(false);
      }
    },
    [authToken]
  );

  const deleteInventory = useCallback(
    async (inventoryId) => {
      try {
        setInventoriesLoading(true);

        const res = await fetch(
          `${VITE_API_URL}/inventories/${inventoryId}/delete`,
          {
            method: 'DELETE',
            headers: {
              Authorization: authToken,
            },
          }
        );

        const body = await res.json();

        if (!res.ok || body.status === 'error') {
          throw new Error(body.message || 'Failed to delete inventory');
        }

        setInventories((prev) => prev.filter((inv) => inv.id !== inventoryId));
      } catch (err) {
        console.error('Error deleting inventory:', err);
        toast.error('Error deleting inventory');
        throw err;
      } finally {
        setInventoriesLoading(false);
      }
    },
    [authToken]
  );

  return {
    inventories,
    inventoriesLoading,
    getInventories,
    addInventory,
    updateInventory,
    deleteInventory,
  };
};

export default useInventories;
