import { BusinessCard } from "../interfaces/card";
import { v4 as uuidv4 } from "uuid";

// 목업 데이터
export const mockCards: BusinessCard[] = [
  {
    id: uuidv4(),
    name: "김철수",
    companyName: "테크 솔루션",
    title: "소프트웨어 엔지니어",
    email: "cheolsu.kim@techsolution.com",
    phone: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    website: "https://techsolution.com",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "박영희",
    companyName: "디자인 스튜디오",
    title: "UI/UX 디자이너",
    email: "younghee.park@designstudio.com",
    phone: "010-2345-6789",
    backgroundColor: "#f0f0f0",
    textColor: "#222222",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "이민준",
    companyName: "마케팅 에이전시",
    title: "마케팅 매니저",
    email: "minjun.lee@marketingagency.com",
    phone: "010-3456-7890",
    website: "https://marketingagency.com",
    backgroundColor: "#e6f7ff",
    textColor: "#003366",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 로컬 스토리지에서 카드 가져오기
export const getCards = (): BusinessCard[] => {
  if (typeof window === "undefined") {
    return mockCards;
  }

  const cards = localStorage.getItem("businessCards");
  if (!cards) {
    localStorage.setItem("businessCards", JSON.stringify(mockCards));
    return mockCards;
  }

  return JSON.parse(cards);
};

// 카드 추가
export const addCard = (
  card: Omit<BusinessCard, "id" | "createdAt" | "updatedAt">
): BusinessCard => {
  const newCard: BusinessCard = {
    ...card,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const cards = getCards();
  const updatedCards = [...cards, newCard];

  localStorage.setItem("businessCards", JSON.stringify(updatedCards));
  return newCard;
};

// 카드 수정
export const updateCard = (
  id: string,
  card: Partial<BusinessCard>
): BusinessCard | null => {
  const cards = getCards();
  const cardIndex = cards.findIndex((c) => c.id === id);

  if (cardIndex === -1) {
    return null;
  }

  const updatedCard = {
    ...cards[cardIndex],
    ...card,
    updatedAt: new Date(),
  };

  const updatedCards = [
    ...cards.slice(0, cardIndex),
    updatedCard,
    ...cards.slice(cardIndex + 1),
  ];

  localStorage.setItem("businessCards", JSON.stringify(updatedCards));
  return updatedCard;
};

// 카드 삭제
export const deleteCard = (id: string): boolean => {
  const cards = getCards();
  const updatedCards = cards.filter((card) => card.id !== id);

  if (updatedCards.length === cards.length) {
    return false;
  }

  localStorage.setItem("businessCards", JSON.stringify(updatedCards));
  return true;
};

// 카드 상세 정보 가져오기
export const getCardById = (id: string): BusinessCard | undefined => {
  const cards = getCards();
  return cards.find((card) => card.id === id);
};
