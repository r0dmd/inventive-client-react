import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth.js";

const { VITE_API_URL } = import.meta.env;

// TODO: MOVER TODOS LOS TIPOS E INTERFACES A UN ARCHIVO APARTE. ESTE DE APIRESPONSE SE REPITE EN OTROS HOOKS Y NO DEBERÍA
interface ApiResponse<T> {
	status: string;
	data?: {
		products: T[];
	};
}

interface Product {
	productId: number | string;
	product: string;
	quantity: number;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

// ---------------------
const useProducts = (inventoryId: string | number) => {
	const { authToken } = useAuth();

	const [products, setProducts] = useState<Product[]>([]);
	const [productsLoading, setProductsLoading] = useState(false);

	const getProducts = useCallback(async (): Promise<Product[]> => {
		try {
			setProductsLoading(true);

			const headers: Record<string, string> = {};
			if (authToken) {
				headers.Authorization = authToken;
			}

			const res = await fetch(`${VITE_API_URL}/products/${inventoryId}`, {
				method: "GET",
				headers,
			});

			const data: ApiResponse<Product> = await res.json();

			if (data.status === "error") throw new Error("Failed to fetch products");

			setProducts(data.data?.products || []);
			return data.data?.products || [];
		} catch (err) {
			console.error("Error fetching products:", err);
			toast.error("Error fetching products");
			throw err;
		} finally {
			setProductsLoading(false);
		}
	}, [authToken, inventoryId]);

	const addProduct = useCallback(
		async (productData: Omit<Product, "id">): Promise<Product> => {
			try {
				setProductsLoading(true);

				const headers: Record<string, string> = {
					"Content-Type": "application/json",
				};
				if (authToken) {
					headers.Authorization = authToken;
				}

				const res = await fetch(`${VITE_API_URL}/products/${inventoryId}/new`, {
					method: "POST",
					headers,
					body: JSON.stringify(productData),
				});

				const newProduct: ApiResponse<Product> = await res.json();
				if (newProduct.status === "error")
					throw new Error("Failed to add product");

				setProducts((prev) => [
					...prev,
					newProduct.products?.[0] || ({} as Product),
				]);
				return newProduct.products?.[0] || ({} as Product);
			} catch (err) {
				console.error("Error adding product:", err);
				toast.error("Error adding product");
				throw err;
			} finally {
				setProductsLoading(false);
			}
		},
		[authToken, inventoryId],
	);

	const updateProduct = useCallback(
		async (productId: number | string, updateData: Partial<Product>) => {
			try {
				setProductsLoading(true);

				const headers: Record<string, string> = {
					"Content-Type": "application/json",
				};
				if (authToken) {
					headers.Authorization = authToken;
				}

				const res = await fetch(
					`${VITE_API_URL}/products/${inventoryId}/${productId}`,
					{
						method: "PUT",
						headers,
						body: JSON.stringify(updateData),
					},
				);

				const result = await res.json();

				if (result.status === "error") {
					throw new Error("Failed to update product");
				}

				// Refresh products list since backend doesn't return updated product
				await getProducts();

				return result;
			} catch (err) {
				console.error("Error updating product:", err);
				toast.error("Error updating product");
				throw err;
			} finally {
				setProductsLoading(false);
			}
		},
		[authToken, inventoryId, getProducts],
	);

	const deleteProduct = useCallback(
		async (productId: number | string) => {
			try {
				setProductsLoading(true);

				const headers: Record<string, string> = {};
				if (authToken) {
					headers.Authorization = authToken;
				}

				const res = await fetch(
					`${VITE_API_URL}/products/${inventoryId}/${productId}/delete`,
					{
						method: "DELETE",
						headers,
					},
				);

				if (!res.ok) throw new Error("Failed to delete product");

				setProducts((prev) => prev.filter((prod) => prod.id !== productId));
			} catch (err) {
				console.error("Error deleting product:", err);
				toast.error("Error deleting product");
				throw err;
			} finally {
				setProductsLoading(false);
			}
		},
		[authToken, inventoryId],
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
