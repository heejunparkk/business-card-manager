'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CardForm from '@/components/CardForm';
import { CardFormData } from '@/interfaces/card';
import { addCard } from '@/lib/cardData';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

export default function AddCardPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (data: CardFormData) => {
    setIsSubmitting(true);
    try {
      addCard(data);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('카드를 추가하는 중 오류가 발생했습니다:', error);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen p-6">
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
        <div className="relative">
          <CardForm
            onSubmit={handleSubmit}
            onCancel={() => router.push('/')}
            title="새 명함 추가"
          />
        </div>{' '}
        {isSubmitting && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="rounded-xl bg-white p-6 text-center shadow-xl dark:bg-gray-800">
              <div className="mb-4">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                명함을 추가하는 중입니다...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
