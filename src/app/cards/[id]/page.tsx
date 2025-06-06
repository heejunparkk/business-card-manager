'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BusinessCard, CardFormData } from '@/interfaces/card';
import { getCardById, deleteCard, updateCard } from '@/lib/cardData';
import CardForm from '@/components/CardForm';
import { FaArrowLeft, FaAddressCard } from 'react-icons/fa';
import styles from './cardDetail.module.css';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
  params: {
    id: string;
  };
}

export default function CardDetail({ params }: Props) {
  // params를 캐시된 Promise로 처리하기 위해 래핑
  const unwrappedParams = params as unknown as Promise<{ id: string }>;
  // React.use()를 사용하여 params 언래핑
  const { id } = use(unwrappedParams);
  const { theme } = useTheme();
  const router = useRouter();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCard = () => {
      try {
        const fetchedCard = getCardById(id);
        if (fetchedCard) {
          setCard(fetchedCard);
        } else {
          // 카드를 찾을 수 없는 경우
          router.push('/');
        }
      } catch (error) {
        console.error('명함을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [id, router]);

  const handleDelete = () => {
    if (window.confirm('정말로 이 명함을 삭제하시겠습니까?')) {
      const success = deleteCard(id);
      if (success) {
        router.push('/');
      }
    }
  };
  const handleUpdate = (formData: CardFormData) => {
    if (card) {
      const updatedCard = updateCard(id, formData);
      if (updatedCard) {
        setCard(updatedCard);
      }
    }
    setIsEditing(false);
  };

  // 색상의 밝기를 계산하는 함수
  const isLightColor = (hexColor: string) => {
    // 기본값은 흰색(밝은 색)
    if (!hexColor) return true;

    // HEX 색상에서 RGB 값 추출
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // 색상의 밝기 계산 (YIQ 공식 사용)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // YIQ 값이 128보다 크면 밝은 색, 작으면 어두운 색
    return yiq >= 128;
  };

  // 카드 배경색과 텍스트 색상을 CSS 변수로 설정
  useEffect(() => {
    // 현재 테마 상태 확인
    const isDarkMode = document.documentElement.classList.contains('dark');

    // 테마에 따른 기본 CSS 변수 값 설정
    let defaultCardBg, defaultCardText;
    if (isDarkMode) {
      defaultCardBg = '#1f2937'; // 다크모드 기본 배경색
      defaultCardText = '#ffffff'; // 다크모드 기본 텍스트색
    } else {
      defaultCardBg = '#ffffff'; // 라이트모드 기본 배경색
      defaultCardText = '#000000'; // 라이트모드 기본 텍스트색
    }

    if (card) {
      document.documentElement.style.setProperty(
        '--card-bg',
        card.backgroundColor || defaultCardBg
      );
      document.documentElement.style.setProperty('--card-text', card.textColor || defaultCardText);
      document.documentElement.style.setProperty(
        '--is-light-card',
        isLightColor(card.backgroundColor || defaultCardBg) ? 'true' : 'false'
      );
    }

    // 컴포넌트 언마운트 시 테마에 맞는 값으로 복원
    return () => {
      // 언마운트 시점의 테마 상태 다시 확인
      const isDarkModeOnUnmount = document.documentElement.classList.contains('dark');

      if (isDarkModeOnUnmount) {
        document.documentElement.style.setProperty('--card-bg', '#1f2937');
        document.documentElement.style.setProperty('--card-text', '#ffffff');
        document.documentElement.style.setProperty('--is-light-card', 'false');
      } else {
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--card-text', '#000000');
        document.documentElement.style.setProperty('--is-light-card', 'true');
      }
    };
  }, [card, theme]);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">명함을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-50 p-4 dark:bg-red-900/30">
            <FaAddressCard className="text-red-400 dark:text-red-300" size={32} />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
            명함을 찾을 수 없습니다
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            요청하신 명함이 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <button
            onClick={() => router.push('/')}
            className={`rounded-full px-6 py-2 text-white shadow-md transition-all duration-300 hover:shadow-lg ${styles.buttonPrimary}`}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.push('/')}
          className={`mb-6 inline-flex items-center rounded-full px-4 py-2 shadow-sm transition-all duration-300 hover:shadow ${
            theme === 'dark'
              ? 'bg-gray-800 text-blue-400 hover:text-blue-300'
              : 'bg-white text-blue-600 hover:text-blue-800'
          }`}
        >
          <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>

        {isEditing ? (
          <div className="mb-8">
            <CardForm
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              initialData={card}
              title="명함 편집"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl transition-all duration-500 dark:border-gray-700 dark:bg-gray-800">
            <div
              className={`p-10 ${styles.cardContainer} ${
                document.documentElement.classList.contains('dark') ? styles.cardDarkShadow : ''
              }`}
            >
              <div className="mb-10 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-4xl font-bold tracking-tight">{card.name}</h1>
                  <p className="text-xl font-light">{card.title}</p>
                </div>
                <div className="flex space-x-5">
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`${isLightColor(card.backgroundColor || '#ffffff') ? styles.lightBgIcon : styles.darkBgIcon}`}
                    aria-label="명함 편집"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`${isLightColor(card.backgroundColor || '#ffffff') ? styles.lightBgIcon : styles.darkBgIcon}`}
                    aria-label="명함 삭제"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
              {card.logo && (
                <div className="mb-10 flex justify-center overflow-hidden rounded-lg bg-white/50 p-4 dark:bg-gray-700/20">
                  <div className="relative h-32 w-full">
                    <Image
                      src={card.logo}
                      alt={`${card.companyName} 로고`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                      className={`drop-shadow-lg ${styles.cardImage}`}
                    />
                  </div>
                </div>
              )}
              <div className="relative mb-10 border-b border-gray-200 pb-6 dark:border-gray-700">
                <h2 className="mb-2 text-2xl font-bold">{card.companyName}</h2>
                <div className="absolute bottom-0 left-0 h-1 w-16 rounded-full bg-current opacity-20"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className={styles.cardSection}>
                    <p className={styles.infoLabel}>이메일</p>
                    <p className="flex items-center text-lg">
                      <span className={styles.infoIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </span>
                      <a href={`mailto:${card.email}`} className={styles.emailLink}>
                        {card.email}
                      </a>
                    </p>
                  </div>
                  <div className={styles.cardSection}>
                    <p className={styles.infoLabel}>연락처</p>
                    <p className="flex items-center text-lg">
                      <span className={styles.infoIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
                        </svg>
                      </span>
                      {card.phone}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  {card.address && (
                    <div className={styles.cardSection}>
                      <p className={styles.infoLabel}>주소</p>
                      <p className="flex items-center text-lg">
                        <span className={styles.infoIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </span>
                        <a
                          href={`https://map.naver.com/v5/search/${encodeURIComponent(card.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center ${styles.naverMapLink}`}
                        >
                          {card.address}
                        </a>
                      </p>
                    </div>
                  )}
                  {card.website && (
                    <div className={styles.cardSection}>
                      <p className={styles.infoLabel}>웹사이트</p>
                      <p className="flex items-center text-lg">
                        <span className={styles.infoIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                            />
                          </svg>
                        </span>
                        <a
                          href={card.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-all hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {card.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>{' '}
            <div className="bg-opacity-10 dark:bg-opacity-30 flex justify-between border-t border-gray-100 bg-black p-6 text-sm text-gray-600 backdrop-blur-md dark:border-gray-700 dark:text-gray-400">
              <div>
                <p className="mb-2 flex items-center opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  생성일:{' '}
                  <span className="ml-1 font-medium">
                    {new Date(card.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </p>
                <p className="flex items-center opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  마지막 수정:{' '}
                  <span className="ml-1 font-medium">
                    {new Date(card.updatedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="mb-2 flex items-center opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  배경색:{' '}
                  <span className="ml-1 rounded bg-gray-100 px-2 py-0.5 font-mono dark:bg-gray-700">
                    {card.backgroundColor || '#ffffff'}
                  </span>
                </p>
                <p className="flex items-center opacity-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  글자색:{' '}
                  <span className="ml-1 rounded bg-gray-100 px-2 py-0.5 font-mono dark:bg-gray-700">
                    {card.textColor || '#000000'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
