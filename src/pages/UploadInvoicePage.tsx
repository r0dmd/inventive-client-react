import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

// -----------------
const UploadInvoicePage = () => {
	const { authToken } = useAuth();
	const navigate = useNavigate();

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [result, setResult] = useState<ReactNode>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files?.[0] || null);
		setResult(null);
		setError(null);
	};

	useEffect(() => {
		if (!authToken) {
			toast.error("You must be logged in to access this page.");
			navigate("/");
		}
	}, [authToken, navigate]);

	if (!authToken) return null;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!selectedFile) {
			setError("Please select a file.");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		const formData = new FormData();
		formData.append("invoice", selectedFile);

		try {
			const response = await fetch(`${VITE_API_URL}/invoices/upload`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Upload failed, try again later.");
			}

			const data = await response.json();
			setResult(data);
			console.log(data);
		} catch (err: unknown) {
			if (err instanceof Error)
				toast.error(
					`An error occurred while uploading the file: ${err.message}`,
				);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
			<h1 className="text-4xl font-bold text-orange-400 mb-6">
				Upload Invoice
			</h1>

			<form
				onSubmit={handleSubmit}
				className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md shadow-lg"
			>
				<div className="mb-4">
					<label
						className="block text-white font-semibold mb-2"
						htmlFor="invoice"
					>
						Choose a photo of the shopping invoice you want to add to your
						products:
					</label>
					<input
						type="file"
						name="invoice"
						accept="image/*"
						onChange={handleFileChange}
						className="w-full p-2 bg-white/20 rounded border border-gray-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
					/>
				</div>

				{error && <p className="text-red-400 mb-4">{error}</p>}

				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full py-2 px-4 rounded bg-orange-500 hover:bg-orange-600 transition ${
						isSubmitting ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isSubmitting ? "Uploading..." : "Submit"}
				</button>
			</form>

			{result && (
				<div className="mt-6 w-full max-w-md bg-white/10 backdrop-blur-sm rounded p-4">
					<h2 className="text-xl font-bold text-orange-400 mb-2">
						Detected Fields
					</h2>
					<pre className="text-sm text-white whitespace-pre-wrap">
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

export default UploadInvoicePage;
