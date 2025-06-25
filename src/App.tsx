import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { Header, Footer } from "./components/index";
import {
	//AboutPage,
	HomePage,
	InventoriesPage,
	//LoginPage,
	NotFoundPage,
	//PrivacyPolicyPage,
	ProfilePage,
	//RegisterPage,
	UserAdminPage,
	ProductsPage,
	CreateInventoryPage,
} from "./pages/index";

// ------------------------------------------
// Main root component. Also used to configure global elements like notifications, shared contexts and main routing
function App() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-primary">
				<Routes>
					<Route path="/" element={<HomePage />} />
					{/* <Route path="/login" element={<LoginPage />} /> */}
					{/* <Route path="/register" element={<RegisterPage />} /> */}
					<Route path="*" element={<NotFoundPage />} />
					<Route path="/profile" element={<ProfilePage />} />

					<Route path="/inventories" element={<InventoriesPage />} />
					<Route
						path="/inventories/:inventoryId/products"
						element={<ProductsPage />}
					/>
					<Route path="/create-inventory" element={<CreateInventoryPage />} />

					<Route path="/admin" element={<UserAdminPage />} />
				</Routes>
			</main>
			<Footer />
			<Toaster position="top-center" />
		</>
	);
}

export default App;
