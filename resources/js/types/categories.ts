export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon?: React.ReactNode;
  color: string;
  textColor: string;
  bgColor: string;
  count?: number;
  featured?: boolean;
  discount?: string;
}

export interface CreateCategoryItem {
  name: string;
  slug: string;
  image: File|null;
  color: string;
  description: string;
}