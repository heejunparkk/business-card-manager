"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAddressCard, FaPlus, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="bg-white dark:bg-gray-900 shadow-md backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-700"
      style={{ backgroundColor: "var(--header-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                <FaAddressCard className="text-white h-5 w-5" />
              </div>
              <span className="ml-3 font-bold text-xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                명함 관리 앱
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={
                theme === "dark" ? "라이트 모드 전환" : "다크 모드 전환"
              }
            >
              {theme === "dark" ? (
                <FaSun className="text-amber-400" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
            </button>

            <Link
              href="/"
              className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                pathname === "/"
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md dark:shadow-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              홈
            </Link>

            <Link
              href="/add"
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                pathname === "/add"
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md dark:shadow-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaPlus className="mr-1" size={12} />새 명함
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
