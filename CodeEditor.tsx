import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'html' | 'css' | 'javascript';
  height?: string;
}

export function CodeEditor({ value, onChange, language, height = '300px' }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    const loadMonaco = async () => {
      try {
        // Load Monaco Editor dynamically
        const monaco = await import('monaco-editor');
        
        if (editorRef.current && !monacoRef.current) {
          monacoRef.current = monaco.editor.create(editorRef.current, {
            value,
            language: language === 'javascript' ? 'javascript' : language,
            theme: 'vs-dark',
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            folding: true,
            bracketPairColorization: { enabled: true },
            roundedSelection: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
            },
          });

        // Custom theme for Power Pack
        monaco.editor.defineTheme('power-pack-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: '#ff6b35' },
            { token: 'string', foreground: '#10b981' },
            { token: 'number', foreground: '#f59e0b' },
            { token: 'comment', foreground: '#6b7280' },
            { token: 'tag', foreground: '#ef4444' },
            { token: 'attribute.name', foreground: '#10b981' },
            { token: 'attribute.value', foreground: '#fbbf24' },
          ],
          colors: {
            'editor.background': '#111827',
            'editor.foreground': '#f3f4f6',
            'editor.lineHighlightBackground': '#1f2937',
            'editorCursor.foreground': '#ff6b35',
            'editor.selectionBackground': '#374151',
            'editor.selectionHighlightBackground': '#1f2937',
            'editorLineNumber.foreground': '#6b7280',
            'editorLineNumber.activeForeground': '#ff6b35',
          },
        });

          monaco.editor.setTheme('power-pack-dark');

          monacoRef.current.onDidChangeModelContent(() => {
            const newValue = monacoRef.current.getValue();
            onChange(newValue);
          });
        }
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
      }
    };

    loadMonaco();

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
        monacoRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.getValue() !== value) {
      monacoRef.current.setValue(value);
    }
  }, [value]);

  return (
    <div 
      ref={editorRef} 
      className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900"
      style={{ height }}
    />
  );
}
