export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  color: string;
  description: string;
}

export interface CreateCategoryItem {
  name: string;
  slug: string;
  image: File|null;
  color: string;
  description: string;
}