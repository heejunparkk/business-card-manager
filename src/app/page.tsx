"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import CardForm from "@/components/CardForm";
import { BusinessCard, CardFormData } from "@/interfaces/card";
import { getCards, addCard, updateCard, deleteCard } from "@/lib/cardData";
import { FaPlus, FaSearch, FaAddressCard } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<BusinessCard | undefined>(
    undefined,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "companyName" | "date">("date");

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
            (card.phone && card.phone.includes(searchTerm)),
        );
      }

      // 정렬
      result.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name, "ko");
          case "companyName":
            return a.companyName.localeCompare(b.companyName, "ko");
          case "date":
          default:
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
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
        prevCards.map((card) => (card.id === editingCard.id ? updated : card)),
      );
    }

    setIsEditing(false);
    setEditingCard(undefined);
  };

  // 명함 삭제하기
  const handleDeleteCard = (id: string) => {
    if (window.confirm("정말로 이 명함을 삭제하시겠습니까?")) {
      const success = deleteCard(id);

      if (success) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      }
    }
  };

  // 명함 편집 시작
  const handleEditStart = (id: string) => {
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditingCard(cardToEdit);
      setIsEditing(true);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              내 명함 관리
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {cards.length > 0
                ? `총 ${cards.length}개의 명함 ${
                    filteredCards.length !== cards.length
                      ? `(검색결과: ${filteredCards.length}개)`
                      : ""
                  }`
                : "저장된 명함 없음"}
            </p>
          </div>
          <button
            onClick={() => router.push("/add")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full flex items-center w-full sm:w-auto justify-center shadow-md hover:shadow-lg transition-all duration-300 font-medium"
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
              className="w-full p-4 pl-12 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <div className="flex flex-wrap gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm dark:shadow-gray-900/10">
            <span className="text-sm text-gray-600 dark:text-gray-400 self-center font-medium">
              정렬:
            </span>
            <button
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                sortBy === "date"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSortBy("date")}
            >
              최신순
            </button>
            <button
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                sortBy === "name"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSortBy("name")}
            >
              이름순
            </button>
            <button
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                sortBy === "companyName"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSortBy("companyName")}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onEdit={handleEditStart}
              onDelete={handleDeleteCard}
            />
          ))}

          {cards.length === 0 && !showForm && (
            <div className="col-span-3 text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                  <FaAddressCard
                    size={48}
                    className="text-blue-400 dark:text-blue-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  저장된 명함이 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  첫 번째 명함을 추가하여 관리를 시작해보세요.
                </p>
                <button
                  onClick={() => router.push("/add")}
                  className="text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  style={{
                    background: "var(--button-primary)",
                    boxShadow: "0 4px 6px -1px var(--shadow-color)",
                  }}
                >
                  첫 번째 명함 추가하기
                </button>
              </div>
            </div>
          )}

          {cards.length > 0 && filteredCards.length === 0 && (
            <div className="col-span-3 text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="mb-6 p-6 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                  <FaSearch
                    size={40}
                    className="text-amber-400 dark:text-amber-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  &ldquo;{searchTerm}&rdquo;에 대한 검색 결과를 찾을 수
                  없습니다.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  style={{
                    background: "linear-gradient(to right, #f59e0b, #d97706)",
                    boxShadow: "0 4px 6px -1px var(--shadow-color)",
                  }}
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
