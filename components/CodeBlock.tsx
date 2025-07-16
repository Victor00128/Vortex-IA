import React, { useState } from 'react';
import { Copy, Edit, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  onEdit?: (code: string, language: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, onEdit }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(code, language);
    }
  };

  return (
    <div className="relative group">
      {/* Header with language and buttons */}
      <div className="flex items-center justify-between bg-zinc-800 px-3 py-2 rounded-t-md border-b border-zinc-700">
        <span className="text-sm text-zinc-300 font-medium">{language}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-300 hover:text-black hover:bg-zinc-700 rounded transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-300 hover:text-black hover:bg-zinc-700 rounded transition-colors"
          >
            <Edit size={14} />
            Editar
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <pre className="bg-zinc-900 p-4 rounded-b-md overflow-auto text-sm">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;

