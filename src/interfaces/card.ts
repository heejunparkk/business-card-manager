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
}
