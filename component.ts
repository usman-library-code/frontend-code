export interface ComponentData {
  id: string;
  title: string;
  category: string;
  description?: string;
  html: string;
  css: string;
  js: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  count: number;
}

export interface ComponentLibraryState {
  categories: Category[];
  components: ComponentData[];
  activeCategory: string;
  searchQuery: string;
  theme: 'light' | 'dark';
}
