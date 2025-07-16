import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import CodeBlock from './CodeBlock';
import CodeEditorModal from './CodeEditor/CodeEditorModal';

declare global {
  interface Window {
    MathJax: {
      typesetPromise: (elements?: HTMLElement[]) => Promise<void>;
    };
  }
}

interface FormattedMessageProps {
  text: string;
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<{
    isOpen: boolean;
    code: string;
    language: string;
  }>({
    isOpen: false,
    code: '',
    language: ''
  });

  useEffect(() => {
    if (window.MathJax?.typesetPromise && contentRef.current) {
      window.MathJax.typesetPromise([contentRef.current]).catch((err) =>
        console.error('MathJax typesetting error:', err)
      );
    }
  }, [text]);

  const processText = (inputText: string) => {
    // Remove single asterisks used for emphasis, but not those for bold or markdown code blocks
    let processedText = inputText.replace(/\*(?!\*|_)(.*?)\*(?!\*|_)/g, '$1');

    // Add download prompt to code blocks
    processedText = processedText.replace(/(```[a-z]+\n[\s\S]*?\n```)/g, '$1\n\n¿Quieres descargar este código como archivo?');

    return processedText;
  };

  const handleEditCode = (code: string, language: string) => {
    setEditorState({
      isOpen: true,
      code,
      language
    });
  };

  const handleCloseEditor = () => {
    setEditorState({
      isOpen: false,
      code: '',
      language: ''
    });
  };

  const handleSaveCode = (newCode: string) => {
    // Aquí podrías implementar la lógica para actualizar el mensaje
    // Por ahora solo cerramos el editor
    console.log('Código guardado:', newCode);
  };

  return (
    <>
      <div ref={contentRef} className="whitespace-pre-wrap break-words">
        <Markdown options={{
          overrides: {
            code: {
              component: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'text';
                const code = String(children).replace(/\n$/, '');
                
                // Si es un bloque de código (no inline), usar nuestro CodeBlock
                if (className) {
                  return (
                    <CodeBlock
                      code={code}
                      language={language}
                      onEdit={handleEditCode}
                    />
                  );
                }
                
                // Para código inline, usar el estilo normal
                return (
                  <code className="bg-zinc-200 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              },
            },
            // Override for strong to ensure no asterisks are used for bold
            strong: {
              component: ({ children }) => <strong>{children}</strong>,
            },
          },
        }}>
          {processText(text)}
        </Markdown>
      </div>

      <CodeEditorModal
        isOpen={editorState.isOpen}
        onClose={handleCloseEditor}
        initialCode={editorState.code}
        language={editorState.language}
        onSave={handleSaveCode}
      />
    </>
  );
};

export default FormattedMessage;

