'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import CardForm from '@/components/CardForm';
import { BusinessCard, CardFormData } from '@/interfaces/card';
import { getCards, addCard, updateCard } from '@/lib/cardData';
import { FaPlus, FaSearch, FaAddressCard } from 'react-icons/fa';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<BusinessCard | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'companyName' | 'date'>('date');

  // 초기 데이터 로드
  useEffect(() => {
    const loadCards = () => {
      const loadedCards = getCards();
      setCards(loadedCards);
      setFilteredCards(loadedCards);
    };

    loadCards();
  }, []);

  // 검색어를 통한 카드 필터링 및 정렬
  useEffect(() => {
    const filterAndSortCards = () => {
      // 필터링
      let result = [...cards];

      if (searchTerm.trim()) {
        const lowercasedSearch = searchTerm.toLowerCase();
        result = result.filter(
          (card) =>
            card.name.toLowerCase().includes(lowercasedSearch) ||
            card.companyName.toLowerCase().includes(lowercasedSearch) ||
            card.title.toLowerCase().includes(lowercasedSearch) ||
            card.email.toLowerCase().includes(lowercasedSearch) ||
            (card.phone && card.phone.includes(searchTerm))
        );
      }

      // 정렬
      result.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name, 'ko');
          case 'companyName':
            return a.companyName.localeCompare(b.companyName, 'ko');
          case 'date':
          default:
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
      });

      setFilteredCards(result);
    };

    filterAndSortCards();
  }, [searchTerm, sortBy, cards]);

  // 명함 추가하기
  const handleAddCard = (data: CardFormData) => {
    const newCard = addCard(data);
    setCards((prevCards) => [...prevCards, newCard]);
    setShowForm(false);
  };

  // 명함 수정하기
  const handleUpdateCard = (data: CardFormData) => {
    if (!editingCard) return;

    const updated = updateCard(editingCard.id, data);
    if (updated) {
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === editingCard.id ? updated : card))
      );
    }

    setIsEditing(false);
    setEditingCard(undefined);
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h1 className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-4xl font-bold text-transparent">
              Business Cards
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {cards.length > 0
                ? `총 ${cards.length}개의 명함 ${
                    filteredCards.length !== cards.length
                      ? `(검색결과: ${filteredCards.length}개)`
                      : ''
                  }`
                : '저장된 명함 없음'}
            </p>
          </div>
          <button
            onClick={() => router.push('/add')}
            className="flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg sm:w-auto"
          >
            <FaPlus className="mr-2" /> 새 명함 추가
          </button>
        </div>

        <div className="mb-8">
          <div className="relative mb-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 회사, 직함, 이메일, 연락처로 검색..."
              className={`w-full rounded-xl border-none p-4 pl-12 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:placeholder-gray-400 ${styles.searchInput}`}
            />
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 transform text-lg text-gray-400" />
          </div>

          <div className={`flex flex-wrap gap-3 rounded-xl p-3 shadow-sm ${styles.sortContainer}`}>
            <span className="self-center text-sm font-medium text-gray-600 dark:text-gray-400">
              정렬:
            </span>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'date' ? styles.activeSort : styles.inactiveSort
              }`}
              onClick={() => setSortBy('date')}
            >
              최신순
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'name' ? styles.activeSort : styles.inactiveSort
              }`}
              onClick={() => setSortBy('name')}
            >
              이름순
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'companyName' ? styles.activeSort : styles.inactiveSort
              }`}
              onClick={() => setSortBy('companyName')}
            >
              회사명순
            </button>
          </div>
        </div>

        {/* 명함 폼 */}
        {showForm && (
          <div className="mb-8">
            <CardForm
              onSubmit={handleAddCard}
              onCancel={() => setShowForm(false)}
              title="새 명함 추가"
            />
          </div>
        )}

        {/* 명함 편집 폼 */}
        {isEditing && editingCard && (
          <div className="mb-8">
            <CardForm
              onSubmit={handleUpdateCard}
              onCancel={() => {
                setIsEditing(false);
                setEditingCard(undefined);
              }}
              initialData={editingCard}
              title="명함 편집"
            />
          </div>
        )}

        {/* 명함 목록 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}

          {cards.length === 0 && !showForm && (
            <div className="col-span-3 rounded-xl border border-gray-100 bg-white py-20 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col items-center">
                <div className="mb-6 rounded-full bg-blue-50 p-6 dark:bg-blue-900/30">
                  <FaAddressCard size={48} className="text-blue-400 dark:text-blue-300" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-200">
                  저장된 명함이 없습니다
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500 dark:text-gray-400">
                  첫 번째 명함을 추가하여 관리를 시작해보세요.
                </p>
                <button
                  onClick={() => router.push('/add')}
                  className={`rounded-full px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg ${styles.primaryButton}`}
                >
                  첫 번째 명함 추가하기
                </button>
              </div>
            </div>
          )}

          {cards.length > 0 && filteredCards.length === 0 && (
            <div className="col-span-3 rounded-xl border border-gray-100 bg-white py-20 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col items-center">
                <div className="mb-6 rounded-full bg-amber-50 p-6 dark:bg-amber-900/30">
                  <FaSearch size={40} className="text-amber-400 dark:text-amber-300" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-200">
                  검색 결과가 없습니다
                </h3>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  &ldquo;{searchTerm}&rdquo;에 대한 검색 결과를 찾을 수 없습니다.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className={`rounded-full px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg ${styles.amberButton}`}
                >
                  모든 명함 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
