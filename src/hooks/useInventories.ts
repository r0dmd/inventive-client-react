import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth";
const { VITE_API_URL } = import.meta.env;

export type Inventory = {
	id: string;
	inventory: string;
	description?: string;
	createdAt: string;
	modifiedAt: string;
};

type ApiResponse<T> = {
	status: "success" | "error";
	message?: string;
	data: T;
};

// --------------------------------
const useInventories = () => {
	const { authToken } = useAuth();
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [inventoriesLoading, setInventoriesLoading] = useState(false);

	const getInventories = useCallback(async (): Promise<Inventory[]> => {
		try {
			setInventoriesLoading(true);

			const res = await fetch(`${VITE_API_URL}/inventories`, {
				method: "GET",
				headers: { Authorization: authToken ?? "" },
			});

			const body: ApiResponse<{ inventories: Inventory[] }> = await res.json();

			if (body.status === "error") throw new Error(body.message);

			setInventories(body.data.inventories);
			return body.data.inventories;
		} catch (err) {
			console.error("Error fetching inventories:", err);
			toast.error("Error fetching inventories");
			throw err;
		} finally {
			setInventoriesLoading(false);
		}
	}, [authToken]);

	const addInventory = useCallback(
		async (inventoryData: FormData): Promise<Inventory> => {
			try {
				setInventoriesLoading(true);

				const res = await fetch(`${VITE_API_URL}/inventories/new`, {
					method: "POST",
					headers: { Authorization: authToken ?? "" },
					body: inventoryData,
				});

				const body: ApiResponse<Inventory> = await res.json();

				if (!res.ok || body.status === "error") {
					throw new Error(body.message ?? "Failed to add inventory");
				}

				setInventories((prev) => [...prev, body.data]);

				return body.data;
			} catch (err) {
				console.error("Error adding inventory:", err);
				toast.error("Error adding inventory");
				throw err;
			} finally {
				setInventoriesLoading(false);
			}
		},
		[authToken],
	);

	const updateInventory = useCallback(
		async (
			inventoryId: string,
			newInventoryName: { newInventoryName: string },
		): Promise<Inventory> => {
			try {
				setInventoriesLoading(true);

				const res = await fetch(
					`${VITE_API_URL}/inventories/${inventoryId}/update`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: authToken ?? "",
						},
						body: JSON.stringify(newInventoryName),
					},
				);

				const body: ApiResponse<Inventory> = await res.json();

				if (!res.ok || body.status === "error") {
					throw new Error(body.message ?? "Failed to update inventory");
				}

				setInventories((prev) =>
					prev.map((inv) =>
						inv.id === inventoryId ? { ...inv, ...body.data } : inv,
					),
				);

				return body.data;
			} catch (err) {
				toast.error("Error updating inventory");
				throw err;
			} finally {
				setInventoriesLoading(false);
			}
		},
		[authToken],
	);

	const deleteInventory = useCallback(
		async (inventoryId: string): Promise<void> => {
			try {
				setInventoriesLoading(true);

				const res = await fetch(
					`${VITE_API_URL}/inventories/${inventoryId}/delete`,
					{
						method: "DELETE",
						headers: { Authorization: authToken ?? "" },
					},
				);

				const body: ApiResponse<null> = await res.json();

				if (!res.ok || body.status === "error") {
					throw new Error(body.message ?? "Failed to delete inventory");
				}

				setInventories((prev) => prev.filter((inv) => inv.id !== inventoryId));
			} catch (err) {
				console.error("Error deleting inventory:", err);
				toast.error("Error deleting inventory");
				throw err;
			} finally {
				setInventoriesLoading(false);
			}
		},
		[authToken],
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
