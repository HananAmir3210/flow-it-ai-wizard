
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Workflow, Save, Download, Eye } from 'lucide-react';
import WorkflowWhiteboard from '@/components/WorkflowWhiteboard';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  connections: string[];
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
            <WorkflowWhiteboard 
              steps={generatedContent.workflow}
              title={title}
              readonly={false}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeneratedContentDisplay;
