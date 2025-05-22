export interface BusinessCard {
  id: string;
  name: string;
  companyName: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
  templateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardFormData {
  name: string;
  companyName: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
  templateId?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  description: string;
  previewImage?: string; // 필요한 경우 디자인 미리보기 이미지 경로
}

// 사전 정의된 카드 디자인 템플릿
export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'classic-white',
    name: '클래식 화이트',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    description: '깔끔한 화이트 배경에 검은색 텍스트',
  },
  {
    id: 'modern-dark',
    name: '모던 다크',
    backgroundColor: '#1f2937',
    textColor: '#f3f4f6',
    description: '세련된 다크 배경에 밝은 텍스트',
  },
  {
    id: 'ocean-blue',
    name: '오션 블루',
    backgroundColor: '#0ea5e9',
    textColor: '#ffffff',
    description: '상쾌한 블루 배경에 화이트 텍스트',
  },
  {
    id: 'elegant-red',
    name: '엘레강트 레드',
    backgroundColor: '#dc2626',
    textColor: '#ffffff',
    description: '강렬한 레드 배경에 화이트 텍스트',
  },
  {
    id: 'nature-green',
    name: '네이처 그린',
    backgroundColor: '#059669',
    textColor: '#ffffff',
    description: '편안한 그린 배경에 화이트 텍스트',
  },
  {
    id: 'pastel-purple',
    name: '파스텔 퍼플',
    backgroundColor: '#a78bfa',
    textColor: '#ffffff',
    description: '부드러운 퍼플 배경에 화이트 텍스트',
  },
];
