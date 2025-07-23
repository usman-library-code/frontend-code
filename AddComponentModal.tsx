import { useState, useEffect, useRef } from 'react';
import { X, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpleCodeEditor } from '@/components/SimpleCodeEditor';
import { ComponentData, Category } from '@/types/component';

interface AddComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (component: Omit<ComponentData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  categories: Category[];
}

export function AddComponentModal({ isOpen, onClose, onSave, categories }: AddComponentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    html: '',
    css: '',
    js: '',
  });

  const [activeTab, setActiveTab] = useState('html');
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (!formData.title || !formData.category) {
      return;
    }

    onSave({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      html: formData.html,
      css: formData.css,
      js: formData.js,
    });

    // Reset form
    setFormData({
      title: '',
      category: '',
      description: '',
      html: '',
      css: '',
      js: '',
    });
    setActiveTab('html');
    setShowPreview(false);
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      title: '',
      category: '',
      description: '',
      html: '',
      css: '',
      js: '',
    });
    setActiveTab('html');
    setShowPreview(false);
    onClose();
  };

  // Execute JavaScript for the preview component
  useEffect(() => {
    if (previewRef.current && formData.js && showPreview) {
      try {
        const executeJS = new Function('container', formData.js);
        executeJS(previewRef.current);
      } catch (error) {
        console.warn('Preview JS execution error:', error);
      }
    }
  }, [formData.js, formData.html, showPreview]);

  const renderPreview = () => {
    try {
      return (
        <div className="h-32 border-t border-dark-tertiary bg-dark-bg p-4">
          <div className="text-xs text-text-secondary mb-2 flex items-center">
            <Eye size={12} className="mr-2" />
            Live Preview
          </div>
          <div 
            ref={previewRef}
            className="h-full flex items-center justify-center"
          >
            <div dangerouslySetInnerHTML={{ __html: formData.html }} />
            <style dangerouslySetInnerHTML={{ __html: formData.css }} />
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="h-32 border-t border-dark-tertiary bg-dark-bg p-4">
          <div className="text-xs text-text-secondary mb-2 flex items-center">
            <Eye size={12} className="mr-2" />
            Live Preview
          </div>
          <div className="h-full flex items-center justify-center text-text-secondary">
            Preview unavailable
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-dark-secondary dark:bg-dark-secondary border-dark-tertiary dark:border-dark-tertiary">
        <DialogHeader className="border-b border-dark-tertiary dark:border-dark-tertiary pb-4">
          <DialogTitle className="text-xl font-semibold text-text-primary dark:text-text-primary">
            Add New Component
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Left Panel - Form */}
          <div className="w-1/3 p-6 border-r border-dark-tertiary dark:border-dark-tertiary">
            <div className="space-y-4">
              <div>
                <Label className="text-text-primary dark:text-text-primary">Component Name</Label>
                <Input
                  placeholder="e.g., Primary Button"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2 bg-dark-tertiary dark:bg-dark-tertiary border-gray-600 dark:border-gray-600 text-text-primary dark:text-text-primary"
                />
              </div>

              <div>
                <Label className="text-text-primary dark:text-text-primary">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-2 bg-dark-tertiary dark:bg-dark-tertiary border-gray-600 dark:border-gray-600 text-text-primary dark:text-text-primary">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-tertiary dark:bg-dark-tertiary border-gray-600 dark:border-gray-600">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-text-primary dark:text-text-primary">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-text-primary dark:text-text-primary">Description</Label>
                <Textarea
                  placeholder="Brief description of the component..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 bg-dark-tertiary dark:bg-dark-tertiary border-gray-600 dark:border-gray-600 text-text-primary dark:text-text-primary resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={!formData.title || !formData.category}
                  className="flex-1 bg-power-orange hover:bg-orange-600 text-white"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 border-gray-600 dark:border-gray-600 text-text-secondary dark:text-text-secondary hover:border-power-orange dark:hover:border-power-orange hover:text-power-orange dark:hover:text-power-orange"
                >
                  <Eye size={16} className="mr-2" />
                  {showPreview ? 'Hide' : 'Preview'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editors */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-dark-tertiary border-b border-dark-tertiary rounded-none p-1">
                <TabsTrigger 
                  value="html" 
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-4 py-2"
                >
                  📄 HTML
                </TabsTrigger>
                <TabsTrigger 
                  value="css"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-4 py-2"
                >
                  🎨 CSS
                </TabsTrigger>
                <TabsTrigger 
                  value="js"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-4 py-2"
                >
                  ⚡ JavaScript
                </TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.html}
                  onChange={(value) => setFormData({ ...formData, html: value })}
                  language="html"
                  height={showPreview ? '300px' : '432px'}
                />
              </TabsContent>

              <TabsContent value="css" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.css}
                  onChange={(value) => setFormData({ ...formData, css: value })}
                  language="css"
                  height={showPreview ? '300px' : '432px'}
                />
              </TabsContent>

              <TabsContent value="js" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.js}
                  onChange={(value) => setFormData({ ...formData, js: value })}
                  language="javascript"
                  height={showPreview ? '300px' : '432px'}
                />
              </TabsContent>
            </Tabs>

            {/* Live Preview Panel */}
            {showPreview && renderPreview()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
