import { useState, useEffect, useRef } from 'react';
import { X, Copy, Edit, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ComponentData } from '@/types/component';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';

interface ComponentCardProps {
  component: ComponentData;
  onEdit: (component: ComponentData) => void;
  onDelete: (componentId: string) => void;
  onReset: (componentId: string) => void;
}

export function ComponentCard({ component, onEdit, onDelete, onReset }: ComponentCardProps) {
  const { toast } = useToast();
  const [isPreviewError, setIsPreviewError] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (type: 'html' | 'css' | 'js' | 'all') => {
    let content = '';
    let description = '';
    
    if (type === 'all') {
      content = `<!-- ${component.title} -->\n<!-- HTML -->\n${component.html}\n\n/* CSS */\n${component.css}\n\n// JavaScript\n${component.js}`;
      description = 'Complete component code copied to clipboard';
    } else {
      content = component[type];
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
    if (previewRef.current && component.js) {
      try {
        // Create a new function to isolate the component's JS
        const executeJS = new Function('container', component.js);
        executeJS(previewRef.current);
      } catch (error) {
        console.warn('Component JS execution error:', error);
      }
    }
  }, [component.js]);

  const renderPreview = () => {
    if (isPreviewError) {
      return (
        <div className="flex items-center justify-center h-20 text-text-secondary">
          <span className="text-sm">Preview unavailable</span>
        </div>
      );
    }

    try {
      return (
        <div 
          ref={previewRef}
          className="flex items-center justify-center min-h-[80px] p-4 component-preview-container"
        >
          <div
            dangerouslySetInnerHTML={{ __html: component.html }}
            className="component-preview"
          />
          <style dangerouslySetInnerHTML={{ __html: component.css }} />
        </div>
      );
    } catch (error) {
      console.error('Preview render error:', error);
      setIsPreviewError(true);
      return (
        <div className="flex items-center justify-center h-20 text-text-secondary">
          <span className="text-sm">Preview error</span>
        </div>
      );
    }
  };

  return (
    <Card className="bg-dark-tertiary dark:bg-dark-tertiary border-gray-700 dark:border-gray-700 hover:border-power-orange dark:hover:border-power-orange transition-colors">
      <CardHeader className="p-4 border-b border-gray-700 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-text-primary dark:text-text-primary">{component.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(component.id)}
            className="text-gray-400 hover:text-red-400 p-1 h-auto"
          >
            <X size={16} />
          </Button>
        </div>
        {component.description && (
          <p className="text-sm text-text-secondary dark:text-text-secondary mt-1">
            {component.description}
          </p>
        )}
      </CardHeader>

      {/* Preview Area */}
      <div className="bg-dark-bg dark:bg-dark-bg border-b border-gray-700 dark:border-gray-700">
        {renderPreview()}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Copy Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            onClick={() => handleCopy('html')}
            className="bg-power-orange hover:bg-orange-600 text-white text-xs font-medium"
          >
            <Copy size={12} className="mr-1" />
            HTML
          </Button>
          <Button
            size="sm"
            onClick={() => handleCopy('css')}
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium"
          >
            <Copy size={12} className="mr-1" />
            CSS
          </Button>
          <Button
            size="sm"
            onClick={() => handleCopy('js')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium"
          >
            <Copy size={12} className="mr-1" />
            JS
          </Button>
        </div>

        {/* Copy All Button */}
        <Button
          size="sm"
          onClick={() => handleCopy('all')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-medium"
        >
          <Copy size={12} className="mr-2" />
          Copy All Code
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(component)}
            className="border-gray-600 text-text-secondary hover:border-power-orange hover:text-power-orange text-xs"
          >
            <Edit size={12} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReset(component.id)}
            className="border-gray-600 text-text-secondary hover:border-power-orange hover:text-power-orange text-xs"
          >
            <RotateCcw size={12} className="mr-1" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
