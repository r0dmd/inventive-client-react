

import { useState } from 'react';


function useTogglePasswordVisibility(initial = false) {
  const [isVisible, setIsVisible] = useState(initial);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return { isVisible, toggleVisibility };
}

export default useTogglePasswordVisibility;
