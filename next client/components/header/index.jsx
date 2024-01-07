import Link from "next/link";

const Header = () => {
  return (
    <div className="p-4 text-sm flex gap-2">
      <Link
        href={"/"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Home
      </Link>
      <Link
        href={"/login"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Login
      </Link>
      <Link
        href={"/register"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Register
      </Link>
      <Link
        href={"/account"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Account
      </Link>
      <Link
        href={"/admin-pannel"}
        className="text-white bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all duration-300 rounded border-2 hover:border-red-500"
      >
        Admin Pannel
      </Link>
    </div>
  );
};

export default Header;
