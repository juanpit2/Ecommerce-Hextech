function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <img src="/img/logo.svg" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-xl text-gray-800">HEXTECH</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm text-gray-700">
          <li className="hover:text-black cursor-pointer flex items-center gap-1">
            Products <span>▼</span>
          </li>
          <li className="hover:text-black cursor-pointer flex items-center gap-1">
            Piltover <span>▼</span>
          </li>
          <li className="hover:text-black cursor-pointer flex items-center gap-1">
            Zaun <span>▼</span>
          </li>
        </ul>

        <div className="flex items-center flex-1 max-w-lg mx-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <img src="/img/cart.svg" alt="Cart" className="w-5 h-5 cursor-pointer" />
          <img src="/img/user.svg" alt="User" className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
