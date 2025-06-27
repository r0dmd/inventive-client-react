import { useState, type FormEvent } from "react";
import { useInventories } from "../hooks/index.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth";

const CreateInventoryPage = () => {
	const [inventoryName, setInventoryName] = useState<string>("");

	const { addInventory, getInventories } = useInventories();
	const navigate = useNavigate();
	const { authUser } = useAuth();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inventoryName.trim()) {
			toast.error("Inventory name is required");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("inventoryName", inventoryName.trim());
			await addInventory(formData);
			await getInventories();
			toast.success("Inventory created successfully");
			navigate("/inventories");
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	};

	return (
		<div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-10 rounded-lg shadow-lg text-black w-full max-w-md"
			>
				<h1 className="text-3xl mb-6 font-bold text-center">
					Create New Inventory
				</h1>
				<input
					type="text"
					value={inventoryName}
					onChange={(e) => setInventoryName(e.target.value)}
					placeholder="Inventory Name"
					className="w-full p-3 mb-4 border rounded"
				/>
				<button
					type="submit"
					className="bg-orange-500 text-white px-6 py-3 rounded w-full"
				>
					Create Inventory
				</button>
			</form>
		</div>
	);
};

export default CreateInventoryPage;
