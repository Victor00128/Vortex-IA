import React, { useEffect, useRef } from 'react';

interface PreviewPanelProps {
  code: string;
  language: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ code, language }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (language.toLowerCase() === 'html') {
      renderHTMLPreview();
    } else if (language.toLowerCase() === 'css') {
      renderCSSPreview();
    } else if (['javascript', 'js'].includes(language.toLowerCase())) {
      renderJSPreview();
    }
  }, [code, language]);

  const renderHTMLPreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  };

  const renderCSSPreview = () => {
    if (previewRef.current) {
      const preview = previewRef.current;
      preview.innerHTML = `
        <style>${code}</style>
        <div class="css-preview-content">
          <h1>Título de Ejemplo</h1>
          <p>Este es un párrafo de ejemplo para mostrar los estilos CSS.</p>
          <button>Botón de Ejemplo</button>
          <div class="box">Caja de Ejemplo</div>
        </div>
      `;
    }
  };

  const renderJSPreview = () => {
    if (previewRef.current) {
      const preview = previewRef.current;
      preview.innerHTML = `
        <div id="js-output">
          <h3>Salida del JavaScript:</h3>
          <div id="console-output"></div>
        </div>
      `;

      // Crear un contexto seguro para ejecutar JavaScript
      try {
        const originalLog = console.log;
        const outputs: string[] = [];
        
        // Interceptar console.log
        console.log = (...args) => {
          outputs.push(args.map(arg => String(arg)).join(' '));
          originalLog(...args);
        };

        // Ejecutar el código en un contexto limitado
        const func = new Function(code);
        func();

        // Restaurar console.log
        console.log = originalLog;

        // Mostrar la salida
        const outputDiv = preview.querySelector('#console-output');
        if (outputDiv) {
          outputDiv.innerHTML = outputs.map(output => 
            `<div class="console-line">${output}</div>`
          ).join('');
        }
      } catch (error) {
        const outputDiv = preview.querySelector('#console-output');
        if (outputDiv) {
          outputDiv.innerHTML = `<div class="error">Error: ${error}</div>`;
        }
      }
    }
  };

  const getPreviewContent = () => {
    switch (language.toLowerCase()) {
      case 'html':
        return (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="HTML Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        );
      
      case 'css':
      case 'javascript':
      case 'js':
        return (
          <div
            ref={previewRef}
            className="w-full h-full p-4 overflow-auto bg-white"
          />
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p>Vista previa no disponible para {language}</p>
              <p className="text-sm mt-2">Solo se admite HTML, CSS y JavaScript</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="h-8 bg-gray-200 flex items-center px-3 text-sm text-gray-600 border-b">
        Vista Previa - {language}
      </div>
      <div className="h-[calc(100%-2rem)]">
        {getPreviewContent()}
      </div>
      
      <style jsx>{`
        .css-preview-content {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .css-preview-content h1 {
          margin-bottom: 10px;
        }
        .css-preview-content p {
          margin-bottom: 15px;
          line-height: 1.5;
        }
        .css-preview-content button {
          padding: 8px 16px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .css-preview-content .box {
          width: 100px;
          height: 100px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .console-line {
          padding: 2px 0;
          font-family: monospace;
          font-size: 14px;
        }
        .error {
          color: red;
          font-family: monospace;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default PreviewPanel;

