
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, FileText, Workflow } from 'lucide-react';
import TagManager from './TagManager';
import type { Database } from '@/integrations/supabase/types';

type SOPCategory = Database['public']['Enums']['sop_category'];

interface SOPInputFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  category: SOPCategory;
  setCategory: (category: SOPCategory) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  isEditing: boolean;
  onClearEdit?: () => void;
}

const SOPInputForm: React.FC<SOPInputFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  setTags,
  isGenerating,
  onGenerate,
  isEditing,
  onClearEdit
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {isEditing ? 'Edit SOP & Workflow' : 'Generate SOP & Workflow'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Create comprehensive SOPs with matching visual workflows using AI
          </p>
        </div>
        {isEditing && onClearEdit && (
          <Button variant="outline" onClick={onClearEdit}>
            Create New SOP
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SOP Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="e.g., Customer Onboarding Process"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(value: SOPCategory) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              placeholder="Describe the process you want to create an SOP for. Be specific about the goals, stakeholders, and key requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <TagManager tags={tags} setTags={setTags} />

          <Button 
            onClick={onGenerate} 
            disabled={isGenerating || !title.trim() || !description.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating SOP & Workflow...
              </>
            ) : (
              <>
                <Workflow className="h-4 w-4 mr-2" />
                Generate SOP & Workflow
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default SOPInputForm;
