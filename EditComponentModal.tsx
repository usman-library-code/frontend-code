import { useState, useEffect, useRef } from 'react';
import { Save, Eye, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SimpleCodeEditor } from '@/components/SimpleCodeEditor';
import { ComponentData } from '@/types/component';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';

interface EditComponentModalProps {
  isOpen: boolean;
  component: ComponentData | null;
  onClose: () => void;
  onSave: (component: ComponentData) => void;
}

export function EditComponentModal({ isOpen, component, onClose, onSave }: EditComponentModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    html: '',
    css: '',
    js: '',
  });
  const [activeTab, setActiveTab] = useState('html');
  const previewRef = useRef<HTMLDivElement>(null);

  // Add keyboard shortcut for saving (Ctrl+S)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }
  }, [isOpen, formData, component]);

  useEffect(() => {
    if (component) {
      setFormData({
        html: component.html,
        css: component.css,
        js: component.js,
      });
    }
  }, [component]);

  const handleSave = () => {
    if (!component) return;

    const updatedComponent: ComponentData = {
      ...component,
      html: formData.html,
      css: formData.css,
      js: formData.js,
      updatedAt: new Date(),
    };

    onSave(updatedComponent);
    onClose();
  };

  const handleCopy = async (type: 'html' | 'css' | 'js' | 'all') => {
    let content = '';
    let description = '';
    
    if (type === 'all') {
      content = `<!-- ${component?.title} -->\n<!-- HTML -->\n${formData.html}\n\n/* CSS */\n${formData.css}\n\n// JavaScript\n${formData.js}`;
      description = 'Complete component code copied to clipboard';
    } else {
      content = formData[type];
      description = `${type.toUpperCase()} code copied to clipboard`;
    }
    
    const success = await copyToClipboard(content);
    
    if (success) {
      toast({
        title: "Copied!",
        description: description,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  // Execute JavaScript for the preview component
  useEffect(() => {
    if (previewRef.current && formData.js) {
      try {
        const executeJS = new Function('container', formData.js);
        executeJS(previewRef.current);
      } catch (error) {
        console.warn('Preview JS execution error:', error);
      }
    }
  }, [formData.js, formData.html]);

  const renderPreview = () => {
    try {
      return (
        <div 
          ref={previewRef}
          className="flex items-center justify-center min-h-[200px] p-4"
        >
          <div dangerouslySetInnerHTML={{ __html: formData.html }} />
          <style dangerouslySetInnerHTML={{ __html: formData.css }} />
        </div>
      );
    } catch (error) {
      return (
        <div className="flex items-center justify-center min-h-[200px] text-text-secondary">
          <span className="text-sm">Preview error</span>
        </div>
      );
    }
  };

  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] bg-dark-secondary dark:bg-dark-secondary border-dark-tertiary dark:border-dark-tertiary">
        <DialogHeader className="border-b border-dark-tertiary dark:border-dark-tertiary pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DialogTitle className="text-xl font-semibold text-text-primary dark:text-text-primary">
                Edit Component
              </DialogTitle>
              <Badge className="bg-power-orange text-white">
                {component.title}
              </Badge>
            </div>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save size={16} className="mr-2" />
              Save Changes <span className="text-xs opacity-75 ml-1">(Ctrl+S)</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex h-[75vh]">
          {/* Code Editors Panel */}
          <div className="w-2/3 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-dark-tertiary border-b border-dark-tertiary rounded-none p-1">
                <TabsTrigger 
                  value="html" 
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-6 py-2"
                >
                  <span className="flex items-center">
                    📄 HTML
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="css"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-6 py-2"
                >
                  <span className="flex items-center">
                    🎨 CSS
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="js"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-text-secondary hover:text-white transition-colors px-6 py-2"
                >
                  <span className="flex items-center">
                    ⚡ JavaScript
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.html}
                  onChange={(value) => setFormData({ ...formData, html: value })}
                  language="html"
                  height="100%"
                />
              </TabsContent>

              <TabsContent value="css" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.css}
                  onChange={(value) => setFormData({ ...formData, css: value })}
                  language="css"
                  height="100%"
                />
              </TabsContent>

              <TabsContent value="js" className="flex-1 p-0 m-0">
                <SimpleCodeEditor
                  value={formData.js}
                  onChange={(value) => setFormData({ ...formData, js: value })}
                  language="javascript"
                  height="100%"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview Panel */}
          <div className="w-1/3 border-l border-dark-tertiary dark:border-dark-tertiary flex flex-col">
            <div className="p-4 border-b border-dark-tertiary dark:border-dark-tertiary bg-dark-tertiary dark:bg-dark-tertiary">
              <h4 className="text-lg font-medium text-text-primary dark:text-text-primary flex items-center">
                <Eye size={16} className="mr-2 text-power-orange" />
                Live Preview
              </h4>
            </div>

            <div className="flex-1 bg-dark-bg dark:bg-dark-bg overflow-auto">
              {renderPreview()}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-dark-tertiary space-y-3">
              <Button
                size="sm"
                onClick={() => handleCopy('all')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-medium"
              >
                <Copy size={12} className="mr-2" />
                Copy All Code
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  onClick={() => handleCopy('html')}
                  className="bg-power-orange hover:bg-orange-600 text-white text-xs"
                >
                  <Copy size={12} className="mr-1" />
                  HTML
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleCopy('css')}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                >
                  <Copy size={12} className="mr-1" />
                  CSS
                </Button>
              </div>
              <Button
                size="sm"
                onClick={() => handleCopy('js')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs"
              >
                <Copy size={12} className="mr-2" />
                JavaScript
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
