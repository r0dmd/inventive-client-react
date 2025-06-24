// Función para alternar la visibilidad de la contraseña

// utils/togglePasswordVisibility.js

import { useState } from "react";

const useTogglePasswordVisibility = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const toggleVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return {
		isPasswordVisible,
		toggleVisibility,
	};
};

export default useTogglePasswordVisibility;
