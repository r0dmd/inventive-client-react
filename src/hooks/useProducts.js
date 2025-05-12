import { useCallback, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext.js';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// ------------------------------------------
const useProducts = (inventoryId) => {
  const { authToken } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      setProductsLoading(true);

      const res = await fetch(`${VITE_API_URL}/products/${inventoryId}`, {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      });

      const data = await res.json();

      if (data.status === 'error') throw new Error('Failed to fetch products');

      setProducts(data);
      return data;
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error('Error fetching products');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  }, [authToken, inventoryId]);

  const addProduct = useCallback(
    async (productData) => {
      try {
        setProductsLoading(true);

        const res = await fetch(`${VITE_API_URL}/products/${inventoryId}/new`, {
          method: 'POST',
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        const newProduct = await res.json();
        if (newProduct.status === 'error')
          throw new Error('Failed to add product');

        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      } catch (err) {
        console.error('Error adding product:', err);
        toast.error('Error adding product');
        throw err;
      } finally {
        setProductsLoading(false);
      }
    },
    [authToken, inventoryId]
  );

  const updateProduct = useCallback(
    async (productId, updateData) => {
      try {
        setProductsLoading(true);

        const res = await fetch(
          `${VITE_API_URL}/products/${inventoryId}/${productId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          }
        );

        const updatedProduct = await res.json();

        if (updatedProduct.status === 'error')
          throw new Error('Failed to update product');

        setProducts((prev) =>
          prev.map((prod) => (prod._id === productId ? updatedProduct : prod))
        );
        return updatedProduct;
      } catch (err) {
        console.error('Error updating product:', err);
        toast.error('Error updating product');
        throw err;
      } finally {
        setProductsLoading(false);
      }
    },
    [authToken, inventoryId]
  );

  const deleteProduct = useCallback(
    async (productId) => {
      try {
        setProductsLoading(true);

        const res = await fetch(
          `${VITE_API_URL}/products/${inventoryId}/${productId}/delete`,
          {
            method: 'DELETE',
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (res.status === 'error') throw new Error('Failed to delete product');

        setProducts((prev) => prev.filter((prod) => prod._id !== productId));
      } catch (err) {
        console.error('Error deleting product:', err);
        toast.error('Error deleting product');
        throw err;
      } finally {
        setProductsLoading(false);
      }
    },
    [authToken, inventoryId]
  );

  return {
    products,
    productsLoading,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
