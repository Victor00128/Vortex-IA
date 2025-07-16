import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { X, Play, Save, Eye, Code } from 'lucide-react';
import PreviewPanel from './PreviewPanel';

interface CodeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode: string;
  language: string;
  onSave?: (code: string) => void;
}

const CodeEditorModal: React.FC<CodeEditorModalProps> = ({
  isOpen,
  onClose,
  initialCode,
  language,
  onSave
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const editorRef = useRef<any>(null);

  if (!isOpen) return null;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleSave = () => {
    if (onSave) {
      onSave(code);
    }
    onClose();
  };

  const handleRun = () => {
    setActiveTab('preview');
  };

  const canPreview = ['html', 'css', 'javascript', 'js'].includes(language.toLowerCase());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Editor de Código - {language}</h2>
            {canPreview && (
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-black hover:text-gray-900'
                  }`}
                >
                  <Code size={16} />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-black hover:text-gray-900'
                  }`}
                >
                  <Eye size={16} />
                  Vista Previa
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {canPreview && (
              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Play size={16} />
                Ejecutar
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Save size={16} />
              Guardar
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Editor Panel */}
          <div className={`${canPreview && activeTab === 'preview' ? 'w-1/2' : 'w-full'} border-r`}>
            <Editor
              height="100%"
              defaultLanguage={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Preview Panel */}
          {canPreview && activeTab === 'preview' && (
            <div className="w-1/2">
              <PreviewPanel code={code} language={language} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorModal;

