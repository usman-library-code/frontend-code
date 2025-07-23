import { useEffect, useRef } from 'react';

interface SimpleCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'html' | 'css' | 'javascript';
  height?: string;
}

export function SimpleCodeEditor({ value, onChange, language, height = '300px' }: SimpleCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab character
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="h-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <div className="px-3 py-2 bg-gray-800 border-b border-gray-700 text-sm font-medium text-gray-300">
        {language.toUpperCase()} Editor
      </div>
      <textarea
        ref={textareaRef}
        defaultValue={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none outline-none border-none"
        style={{ 
          height: `calc(${height} - 40px)`,
          fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
          lineHeight: '1.5'
        }}
        placeholder={`Enter your ${language.toUpperCase()} code here...`}
        spellCheck={false}
      />
    </div>
  );
}