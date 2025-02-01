import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-around bg-blue-500 text-white text-center text-2xl p-4">
      <Link
        className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600  transition-colors hover:bg-transparent focus:outline-none focus:ring"
        to="/login"
      >
        <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
          Log In
        </span>

        <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </Link>
      Header
      <Link
        className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600  transition-colors hover:bg-transparent focus:outline-none focus:ring"
        to="/signup"
      >
        <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
          Sigh Up
        </span>

        <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </Link>
    </header>
  );
};

export default Header;
