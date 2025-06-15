
import React from 'react';
import { X, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type SOP = Database['public']['Tables']['sops']['Row'];

interface SOPViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sop: SOP | null;
}

const SOPViewModal: React.FC<SOPViewModalProps> = ({ isOpen, onClose, sop }) => {
  const { toast } = useToast();

  if (!isOpen || !sop) return null;

  const handleCopy = () => {
    const content = `${sop.title}\n\n${sop.description || ''}\n\n${sop.generated_content || ''}`;
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "SOP content has been copied to your clipboard.",
    });
  };

  const handleExport = () => {
    const content = `# ${sop.title}\n\n## Description\n${sop.description || 'No description'}\n\n## Category\n${sop.category}\n\n## Content\n${sop.generated_content || 'No content available'}\n\n## Tags\n${sop.tags?.join(', ') || 'No tags'}\n\nGenerated on: ${new Date(sop.created_at).toLocaleDateString()}`;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sop.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "SOP Exported",
      description: "Your SOP has been downloaded as a markdown file.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{sop.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Category: {sop.category} • Created: {new Date(sop.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={16} />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download size={16} />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
          {sop.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{sop.description}</p>
            </div>
          )}
          
          {sop.generated_content && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Generated Content</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm dark:text-gray-300 font-sans">
                  {sop.generated_content}
                </pre>
              </div>
            </div>
          )}

          {sop.tags && sop.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {sop.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(sop.updated_at).toLocaleString()}
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOPViewModal;
