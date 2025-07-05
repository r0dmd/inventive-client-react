// pages/ProductsPage.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Params = {
	inventoryId?: string;
};

const ProductsPage: React.FC = () => {
	const { inventoryId } = useParams<Params>();
	const navigate = useNavigate();

	const {
		products,
		productsLoading,
		getProducts,
		addProduct,
		updateProduct,
		deleteProduct,
	} = useProducts(inventoryId || "");

	const [editingId, setEditingId] = useState<string | number | null>(null);
	const [editedName, setEditedName] = useState<string>("");

	useEffect(() => {
		if (!inventoryId) {
			toast.error("Invalid inventory ID");
			navigate("/");
			return;
		}

		getProducts().catch(() => {
			toast.error("Failed to load products");
		});
	}, [getProducts, inventoryId, navigate]);

	const handleAdd = async () => {
		const { value: formValues } = await Swal.fire<{
			productName: string;
			description: string;
			quantity: number;
		}>({
			title: "New Product",
			html:
				'<input id="swal-input1" class="swal2-input" placeholder="Product Name">' +
				'<input id="swal-input2" class="swal2-input" placeholder="Description">' +
				'<input id="swal-input3" type="number" class="swal2-input" placeholder="Quantity">',
			focusConfirm: false,
			showCancelButton: true,
			preConfirm: () => {
				const name = (
					document.getElementById("swal-input1") as HTMLInputElement
				)?.value.trim();
				const desc = (
					document.getElementById("swal-input2") as HTMLInputElement
				)?.value.trim();
				const qty = Number(
					(document.getElementById("swal-input3") as HTMLInputElement).value,
				);

				if (!name || !desc || Number.isNaN(qty)) {
					Swal.showValidationMessage("Please fill in all fields correctly");
					return false;
				}

				return { productName: name, description: desc, quantity: qty };
			},
		});

		if (!formValues) return;

		try {
			await addProduct(formValues);
			await getProducts();
			toast.success("Product added successfully");
		} catch (err: unknown) {
			if (err instanceof Error)
				toast.error(`Error adding product: ${err.message || err}`);
		}
	};

	const handleEdit = (productId: string | number) => {
		setEditingId(productId);
		const productToEdit = products.find((p) => p.id === productId);
		setEditedName(productToEdit?.productName || "");
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditedName("");
	};

	const handleSave = async (productId: string | number) => {
		try {
			await updateProduct(productId, { productName: editedName });
			setEditingId(null);
			setEditedName("");
			toast.success("Product updated");
		} catch {
			toast.error("Error updating product");
		}
	};

	const handleDelete = async (productId: string | number) => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "This product will be permanently deleted.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it",
		});

		if (!result.isConfirmed) return;

		try {
			await deleteProduct(productId);
			await getProducts();
			toast.success("Product deleted");
		} catch {
			toast.error("Error deleting product");
		}
	};

	const handleBack = () => {
		navigate(-1); // Go back to the previous page in history
	};

	if (productsLoading) return <p className="p-6">Loading...</p>;

	return (
		<div className="m-10 p-6">
			<div>
				<button
					type="button"
					onClick={handleBack}
					className="flex items-center gap-2 border rounded px-2 text-orange-400 font-bold mb-2 cursor-pointer"
				>
					<FaArrowLeft size={16} /> Go back to inventory list
				</button>
				<p className="text-white flex items-center gap-2">
					Click here to add new products
					<FaArrowRight size={16} />
					<button
						type="button"
						onClick={handleAdd}
						className="border border-white text-white px-3 py-1 rounded hover:bg-orange-400 hover:border-orange-950 hover:text-black transition"
					>
						Add Product
					</button>
				</p>
			</div>

			{products.length === 0 ? (
				<p className="m-10 text-gray-500">Saved products will show here....</p>
			) : (
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border p-2 text-left">Name</th>
							<th className="border p-2 text-left">Description</th>
							<th className="border p-2 text-left">Quantity</th>
							<th className="border p-2 text-left">Created At</th>
							<th className="border p-2 text-left">Updated At</th>
							<th className="border p-2 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((prod) => {
							const isEditing = editingId === prod.id;

							return (
								<tr key={prod.id}>
									<td className="border p-2">
										{isEditing ? (
											<input
												type="text"
												value={editedName}
												onChange={(e) => setEditedName(e.target.value)}
												className="border px-2 py-1 w-full"
											/>
										) : (
											prod.productName
										)}
									</td>
									<td className="border p-2">{prod.description}</td>
									<td className="border p-2">{prod.quantity}</td>
									<td className="border p-2">{prod.createdAt}</td>
									<td className="border p-2">{prod.updatedAt || "-"}</td>
									<td className="border p-2 space-x-2">
										{isEditing ? (
											<>
												<button
													type="button"
													onClick={() => handleSave(prod.id)}
													className="border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
												>
													Save
												</button>
												<button
													type="button"
													onClick={handleCancel}
													className="border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
												>
													Cancel
												</button>
											</>
										) : (
											<>
												<button
													type="button"
													onClick={() => handleEdit(prod.id)}
													className="border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
												>
													Edit
												</button>
												<button
													type="button"
													onClick={() => handleDelete(prod.id)}
													className="border border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
												>
													Delete
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

export default ProductsPage;
