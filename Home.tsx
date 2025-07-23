import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/Sidebar';
import { ComponentCard } from '@/components/ComponentCard';
import { AddComponentModal } from '@/components/AddComponentModal';
import { EditComponentModal } from '@/components/EditComponentModal';
import { DownloadButton } from '@/components/DownloadButton';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ComponentData, Category } from '@/types/component';
import { defaultCategories, defaultComponents } from '@/utils/default-components';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const [categories, setCategories] = useLocalStorage<Category[]>('power-pack-categories', defaultCategories);
  const [components, setComponents] = useLocalStorage<ComponentData[]>('power-pack-components', defaultComponents);
  const [activeCategory, setActiveCategory] = useState('buttons');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<ComponentData | null>(null);

  // Filter components based on active category and search query
  const filteredComponents = useMemo(() => {
    let filtered = components.filter(component => component.category === activeCategory);
    
    if (searchQuery) {
      filtered = filtered.filter(component =>
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [components, activeCategory, searchQuery]);

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: components.filter(component => component.category === category.id).length
    }));
  }, [categories, components]);

  const handleAddComponent = (componentData: Omit<ComponentData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newComponent: ComponentData = {
      ...componentData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setComponents(prev => [...prev, newComponent]);
    
    toast({
      title: "Component Added",
      description: `${componentData.title} has been added successfully`,
    });
  };

  const handleEditComponent = (component: ComponentData) => {
    setEditingComponent(component);
    setIsEditModalOpen(true);
  };

  const handleSaveComponent = (updatedComponent: ComponentData) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === updatedComponent.id ? updatedComponent : component
      )
    );

    toast({
      title: "Component Updated",
      description: `${updatedComponent.title} has been updated successfully`,
    });
  };

  const handleDeleteComponent = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    setComponents(prev => prev.filter(c => c.id !== componentId));
    
    toast({
      title: "Component Deleted",
      description: `${component?.title} has been deleted`,
    });
  };

  const handleResetComponent = (componentId: string) => {
    const originalComponent = defaultComponents.find(c => c.id === componentId);
    if (originalComponent) {
      setComponents(prev =>
        prev.map(component =>
          component.id === componentId 
            ? { ...originalComponent, updatedAt: new Date() }
            : component
        )
      );
      
      toast({
        title: "Component Reset",
        description: `${originalComponent.title} has been reset to default`,
      });
    }
  };

  const handleAddCategory = () => {
    const categoryName = prompt('Enter category name:');
    if (categoryName && !categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())) {
      const newCategory: Category = {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        name: categoryName,
        icon: 'star',
        count: 0,
      };
      
      setCategories(prev => [...prev, newCategory]);
      
      toast({
        title: "Category Added",
        description: `${categoryName} category has been created`,
      });
    }
  };

  const currentCategory = categoriesWithCounts.find(cat => cat.id === activeCategory);

  return (
    <div className="flex h-screen bg-dark-bg dark:bg-dark-bg text-text-primary dark:text-text-primary">
      <Sidebar
        categories={categoriesWithCounts}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddCategory={handleAddCategory}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-dark-secondary dark:bg-dark-secondary border-b border-dark-tertiary dark:border-dark-tertiary px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary">
                {currentCategory?.name || 'Components'}
              </h2>
              <p className="text-text-secondary dark:text-text-secondary mt-1">
                {currentCategory?.description || 'Manage your UI components'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <DownloadButton />
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-power-orange hover:bg-orange-600 text-white"
              >
                <Plus size={16} className="mr-2" />
                Add Component
              </Button>
            </div>
          </div>
        </header>

        {/* Components Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filteredComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-text-secondary dark:text-text-secondary">
              <div className="text-lg mb-2">No components found</div>
              <p className="text-sm">
                {searchQuery 
                  ? `No components match "${searchQuery}" in ${currentCategory?.name}`
                  : `No components in ${currentCategory?.name} yet`
                }
              </p>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 bg-power-orange hover:bg-orange-600 text-white"
              >
                <Plus size={16} className="mr-2" />
                Add First Component
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onEdit={handleEditComponent}
                  onDelete={handleDeleteComponent}
                  onReset={handleResetComponent}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddComponentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddComponent}
        categories={categories}
      />

      <EditComponentModal
        isOpen={isEditModalOpen}
        component={editingComponent}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingComponent(null);
        }}
        onSave={handleSaveComponent}
      />
    </div>
  );
}
