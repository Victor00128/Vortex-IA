import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Tema oscuro para el resaltado
import { Copy, Download, ChevronDown, ChevronUp } from 'lucide-react'; // Importar iconos

interface CodeDisplayProps {
  code: string;
  language: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Código oculto por defecto

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Código copiado al portapapeles!');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'html' ? 'html' : language === 'javascript' ? 'js' : language === 'css' ? 'css' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="code-section">
      <div className="code-header" onClick={toggleExpand}>
        <span className="code-title">{language.toUpperCase()}</span>
        <span className={`chevron ${isExpanded ? 'rotated' : ''}`}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>
      <div id="codeContent" className={`code-content ${isExpanded ? 'expanded' : ''}`}>
        <pre className="code-block"><code ref={codeRef} className={`language-${language}`}>{code}</code></pre>
        <div className="action-buttons">
          <button onClick={handleCopy} title="Copiar código">
            <Copy size={16} /> Copiar
          </button>
          <button onClick={handleDownload} title="Descargar código">
            <Download size={16} /> Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;


