'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BusinessCard, CardFormData } from '@/interfaces/card';
import { getCardById, deleteCard, updateCard } from '@/lib/cardData';
import CardForm from '@/components/CardForm';
import { FaEdit, FaTrash, FaArrowLeft, FaAddressCard } from 'react-icons/fa';
import styles from './cardDetail.module.css';

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

  // 카드 배경색과 텍스트 색상을 CSS 변수로 설정
  useEffect(() => {
    if (card) {
      document.documentElement.style.setProperty('--card-bg', card.backgroundColor || '#ffffff');
      document.documentElement.style.setProperty('--card-text', card.textColor || '#000000');
    }
  }, [card]);
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
          className="mb-6 inline-flex items-center rounded-full bg-white px-4 py-2 text-blue-600 shadow-sm transition-all duration-300 hover:text-blue-800 hover:shadow dark:bg-gray-800 dark:text-blue-400 dark:hover:text-blue-300"
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
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div
              className={`p-8 ${styles.cardContainer} ${
                document.documentElement.classList.contains('dark') ? styles.cardDarkShadow : ''
              }`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="mb-1 text-4xl font-bold">{card.name}</h1>
                  <p className="text-xl opacity-90">{card.title}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                    aria-label="명함 편집"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/40"
                    aria-label="명함 삭제"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              {card.logo && (
                <div className="mb-8 flex justify-center">
                  <div className="relative h-32 w-full">
                    <Image
                      src={card.logo}
                      alt={`${card.companyName} 로고`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                      className={`drop-shadow-sm ${styles.cardImage}`}
                    />
                  </div>
                </div>
              )}{' '}
              <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
                <h2 className="mb-2 text-2xl font-bold">{card.companyName}</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="bg-opacity-5 dark:bg-opacity-10 rounded-lg bg-black p-4 dark:bg-white">
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      이메일
                    </p>
                    <p className="flex items-center text-lg">
                      <span className="mr-2 inline-block w-5 opacity-70">✉️</span>
                      {card.email}
                    </p>
                  </div>
                  <div className="bg-opacity-5 dark:bg-opacity-10 rounded-lg bg-black p-4 dark:bg-white">
                    <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      연락처
                    </p>
                    <p className="flex items-center text-lg">
                      <span className="mr-2 inline-block w-5 opacity-70">📱</span>
                      {card.phone}
                    </p>
                  </div>
                </div>{' '}
                <div className="space-y-6">
                  {card.address && (
                    <div className="bg-opacity-5 dark:bg-opacity-10 rounded-lg bg-black p-4 dark:bg-white">
                      <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        주소
                      </p>
                      <p className="flex items-center text-lg">
                        <span className="mr-2 inline-block w-5 opacity-70">🏢</span>
                        {card.address}
                      </p>
                    </div>
                  )}
                  {card.website && (
                    <div className="bg-opacity-5 dark:bg-opacity-10 rounded-lg bg-black p-4 dark:bg-white">
                      <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        웹사이트
                      </p>
                      <p className="flex items-center text-lg">
                        <span className="mr-2 inline-block w-5 opacity-70">🌐</span>
                        <a
                          href={card.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-colors hover:underline dark:text-blue-400"
                        >
                          {card.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>{' '}
            <div className="bg-opacity-10 dark:bg-opacity-30 flex justify-between bg-black p-5 text-sm text-gray-600 backdrop-blur-sm dark:text-gray-400">
              <div>
                <p className="mb-1">
                  생성일:{' '}
                  {new Date(card.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <p>
                  마지막 수정:{' '}
                  {new Date(card.updatedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="mb-1">
                  배경색: <span className="font-mono">{card.backgroundColor || '#ffffff'}</span>
                </p>
                <p>
                  글자색: <span className="font-mono">{card.textColor || '#000000'}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
