'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAddressCard, FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-10 border-b border-gray-100 shadow-md backdrop-blur-md dark:border-gray-700 dark:bg-gray-900 ${styles.headerBg}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center">
              <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2 shadow-md transition-all duration-300 group-hover:shadow-lg">
                <FaAddressCard className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-xl font-bold text-transparent">
                Business Cards App
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label={theme === 'dark' ? '라이트 모드 전환' : '다크 모드 전환'}
            >
              {theme === 'dark' ? (
                <FaSun className="text-amber-400" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
            </button>

            <Link
              href="/"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === '/'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md dark:shadow-blue-900/20'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              홈
            </Link>

            <Link
              href="/add"
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === '/add'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md dark:shadow-blue-900/20'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
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
