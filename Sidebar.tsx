import { Search, Plus, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/component';
import { useThemeContext } from './ThemeProvider';
import * as LucideIcons from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddCategory: () => void;
}

const iconMap: Record<string, any> = {
  'mouse-pointer': LucideIcons.MousePointer,
  'heading': LucideIcons.Heading,
  'form-input': LucideIcons.FormInput,
  'sliders-horizontal': LucideIcons.SlidersHorizontal,
  'images': LucideIcons.Images,
  'zap': LucideIcons.Zap,
  'star': LucideIcons.Star,
};

export function Sidebar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onAddCategory,
}: SidebarProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <aside className="w-72 bg-dark-secondary dark:bg-dark-secondary border-r border-dark-tertiary dark:border-dark-tertiary flex flex-col h-screen">
      {/* Logo Header */}
      <div className="p-6 border-b border-dark-tertiary dark:border-dark-tertiary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-power-orange to-orange-400 rounded-lg flex items-center justify-center">
            <LucideIcons.Code className="text-white text-lg" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-text-primary dark:text-text-primary">Power Pack</h1>
            <p className="text-sm text-text-secondary dark:text-text-secondary">Code Library</p>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="px-6 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start text-text-secondary dark:text-text-secondary hover:text-power-orange dark:hover:text-power-orange hover:bg-dark-tertiary dark:hover:bg-dark-tertiary"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-secondary" size={16} />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-dark-tertiary dark:bg-dark-tertiary border-gray-600 dark:border-gray-600 text-text-primary dark:text-text-primary placeholder-text-secondary dark:placeholder-text-secondary focus:border-power-orange dark:focus:border-power-orange"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-text-secondary dark:text-text-secondary mb-3 font-medium">
            Categories
          </div>

          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || LucideIcons.Star;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-power-orange text-white'
                    : 'text-text-secondary dark:text-text-secondary hover:bg-dark-tertiary dark:hover:bg-dark-tertiary hover:text-text-primary dark:hover:text-text-primary'
                }`}
              >
                <IconComponent size={18} />
                <span className="ml-3 flex-1 text-left">{category.name}</span>
                <span className="text-sm">{category.count}</span>
              </button>
            );
          })}
        </div>

        {/* Add Category Button */}
        <Button
          variant="outline"
          onClick={onAddCategory}
          className="w-full mt-6 border-2 border-dashed border-gray-600 dark:border-gray-600 text-text-secondary dark:text-text-secondary hover:border-power-orange dark:hover:border-power-orange hover:text-power-orange dark:hover:text-power-orange bg-transparent hover:bg-transparent"
        >
          <Plus size={16} />
          <span className="ml-2">Add Category</span>
        </Button>
      </nav>
    </aside>
  );
}
