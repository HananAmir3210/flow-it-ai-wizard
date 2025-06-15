
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Workflow, Save, Download, Eye, Edit } from 'lucide-react';
import InteractiveWorkflowModal from '@/components/InteractiveWorkflowModal';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
  next?: string[];
}

interface GeneratedContent {
  sop: {
    title: string;
    content: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      details: string[];
    }>;
  };
  workflow: WorkflowStep[];
}

interface GeneratedContentDisplayProps {
  generatedContent: GeneratedContent;
  title: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  isEditing: boolean;
  onPreview: () => void;
  onExport: () => void;
  onSave: () => void;
}

const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({
  generatedContent,
  title,
  activeTab,
  setActiveTab,
  loading,
  isEditing,
  onPreview,
  onExport,
  onSave
}) => {
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false);

  // Convert workflow steps to the format expected by InteractiveWorkflowModal
  const convertToInteractiveFormat = (workflow: WorkflowStep[]) => {
    return workflow.map(step => ({
      id: step.id,
      title: step.title,
      type: step.type,
      next: step.connections || step.next || []
    }));
  };

  const handleInteractiveEdit = () => {
    setIsInteractiveModalOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generated Content</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onPreview}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button onClick={onSave} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? 'Update SOP' : 'Save SOP'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sop">
              <FileText className="h-4 w-4 mr-2" />
              SOP Document
            </TabsTrigger>
            <TabsTrigger value="workflow">
              <Workflow className="h-4 w-4 mr-2" />
              Visual Workflow
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sop" className="mt-4">
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{generatedContent.sop.title}</h2>
                <div className="space-y-4">
                  {generatedContent.sop.steps.map((step, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-lg">
                        Step {step.number}: {step.title}
                      </h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      {step.details.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {step.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workflow" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Workflow Visualization</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleInteractiveEdit}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Interactive Edit
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click "Interactive Edit" to visualize and edit this workflow</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Steps: {generatedContent.workflow.length}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Interactive Workflow Modal */}
      <InteractiveWorkflowModal
        isOpen={isInteractiveModalOpen}
        onClose={() => setIsInteractiveModalOpen(false)}
        steps={convertToInteractiveFormat(generatedContent.workflow)}
        title={`${title} - Workflow Editor`}
      />
    </Card>
  );
};

export default GeneratedContentDisplay;
