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
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message);
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
		} catch (err: unknown) {
			if (err instanceof Error)
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
		} catch (err: unknown) {
			if (err instanceof Error)
				toast.error(`Failed to add inventory: ${err.message}`);
		}
	};

	if (authUserLoading || inventoriesLoading)
		return <p className="p-6 text-center text-gray-600">Loading...</p>;

	return (
		<div className="p-8 mt-10 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg max-w-5xl mx-auto"	>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-orange-400">Inventories</h1>
				<button
  type="button"
  onClick={handleAdd}
  className="border border-black text-black px-6 py-3 rounded-xl hover:bg-orange-400 hover:text-white transition-colors"
>
  + Add Inventory
</button>
			</div>

			{inventories?.length === 0 ? (
				<p className="text-center text-gray-600 text-lg">No inventory items found.</p>
			) : (
				<table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
					<thead>
						<tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wide">
							<th className="p-4">Name</th>
							<th className="p-4">Created at</th>
							<th className="p-4">Modified at</th>
							<th className="p-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{inventories.map((inv: Inventory, index: number) => {
							const isEditing = editingId === inv.id;

							return (
								<tr
									key={inv.id || `temp-${index}`}
									className="border-b last:border-none hover:bg-gray-50 transition-colors"
								>
									<td className="p-4">
										{isEditing ? (
											<input
												type="text"
												value={editedName}
												onChange={(e) => setEditedName(e.target.value)}
												className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
											/>
										) : (
											<span className="text-gray-900 font-medium">{inv.name}</span>
										)}
									</td>
									<td className="p-4 text-gray-600">{"-"}</td>
									<td className="p-4 text-gray-600">{"-"}</td>
									<td className="p-4 space-x-2">
										{isEditing ? (
											<>
												<button
													type="button"
													onClick={() => handleSave(inv.id)}
className="border border-black text-black px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors"												>
													Save
												</button>
												<button
													type="button"
													onClick={handleCancel}
className="border border-black text-black px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white transition-colors"												>
													Cancel
												</button>
											</>
										) : (
											<>
												<button
													type="button"
													onClick={() => handleEdit(inv.id, inv.name)}
className="border border-black text-black px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors"												>
													Edit
												</button>
												<button
													type="button"
													onClick={() => handleDelete(inv.id)}
className="border border-black text-black px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white transition-colors"												>
													Delete
												</button>
												<button
													type="button"
													onClick={() =>
														navigate(`/inventories/${inv.id}/products`)
													}
className="border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"												>
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
