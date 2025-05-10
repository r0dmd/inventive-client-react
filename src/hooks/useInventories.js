import { useCallback, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext.js';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// ------------------------------------------
const useInventories = () => {
  const { authToken } = useContext(AuthContext);

  const [inventories, setInventories] = useState([]);
  const [inventoriesLoading, setInventoriesLoading] = useState(false);

  const getInventories = useCallback(async () => {
    try {
      setInventoriesLoading(true);

      const data = await fetch(`${VITE_API_URL}/inventories`, {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      });

      setInventories(data);
      return data;
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

        const newInventory = await fetch('/inventories/new', {
          method: 'POST',
          headers: {
            Authorization: authToken,
          },
          body: inventoryData,
        });

        setInventories((prev) => [...prev, newInventory]);
        return newInventory;
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

        const updated = await fetch(`/inventories/${inventoryId}/update`, {
          method: 'PUT',
          headers: {
            Authorization: authToken,
          },
          body: updateData,
        });

        setInventories((prev) =>
          prev.map((inv) => (inv._id === inventoryId ? updated : inv))
        );
        return updated;
      } catch (err) {
        console.error('Error updating inventory:', err);
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

        await fetch(`/inventories/${inventoryId}/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: authToken,
          },
        });

        setInventories((prev) => prev.filter((inv) => inv._id !== inventoryId));
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
