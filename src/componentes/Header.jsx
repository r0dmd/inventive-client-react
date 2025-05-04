// src/components/Header.jsx
function Header() {
    return (
      <header className="bg-stone-700 py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Inventive</h1>
        <nav>
          <ul className="flex gap-4 text-gray-700">
            <li><a href="#" className=" text-white hover:text-blue-500">Inicio</a></li>
            <li><a href="#" className=" text-white hover:text-blue-500">Login</a></li>
            <li><a href="#" className=" text-white hover:text-blue-500">Contacto</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;
  