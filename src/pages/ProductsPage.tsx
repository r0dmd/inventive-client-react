// pages/ProductsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { toast } from "sonner";
import Swal from "sweetalert2";

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
          (document.getElementById("swal-input3") as HTMLInputElement).value
        );

        if (!name || !desc || isNaN(qty)) {
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
    } catch (err: any) {
      toast.error("Error adding product: " + (err.message || err));
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

  if (productsLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products of Inventory #{inventoryId}</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
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
                          onClick={() => handleSave(prod.id)}
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
                          onClick={() => handleEdit(prod.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
