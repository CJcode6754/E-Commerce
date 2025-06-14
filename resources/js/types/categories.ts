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