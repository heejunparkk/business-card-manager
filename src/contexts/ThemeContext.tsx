'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // 브라우저 localStorage에서 테마 설정 불러오기
  useEffect(() => {
    // SSR에서는 window가 없으므로 이를 확인
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      let currentTheme: Theme;

      if (savedTheme) {
        currentTheme = savedTheme;
      } else if (prefersDark) {
        currentTheme = 'dark';
      } else {
        currentTheme = 'light';
      }

      // 테마 상태 업데이트
      setTheme(currentTheme);

      // HTML 문서에 dark 클래스 적용
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);

      // 확실하게 dark 클래스를 전환
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // 강제로 DOM을 업데이트하기 위한 방법
      document.body.style.backgroundColor = '';

      // 애니메이션 효과를 위한 transition 클래스를 추가했다가 제거
      document.documentElement.classList.add('theme-transition');

      setTimeout(() => {
        document.body.style.backgroundColor = 'var(--background)';

        // CSS 변수가 전파되도록 약간의 지연 후 transition 클래스 제거
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 300);
      }, 0);
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
