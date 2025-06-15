
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SOP {
  id: number;
  title: string;
  dateCreated: string;
  category: string;
  tags: string[];
  content?: string;
  prompt?: string;
}

const MySOPs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sops, setSOPs] = useState<SOP[]>([]);
  const { toast } = useToast();

  // Load SOPs from localStorage on component mount
  useEffect(() => {
    const savedSOPs = JSON.parse(localStorage.getItem('user-sops') || '[]');
    const defaultSOPs: SOP[] = [
      {
        id: 1,
        title: 'Customer Onboarding Process',
        dateCreated: '2024-01-15',
        category: 'Sales',
        tags: ['onboarding', 'customer'],
      },
      {
        id: 2,
        title: 'HR Recruitment Guidelines',
        dateCreated: '2024-01-10',
        category: 'HR',
        tags: ['recruitment', 'hiring'],
      },
      {
        id: 3,
        title: 'Project Management Workflow',
        dateCreated: '2024-01-08',
        category: 'Operations',
        tags: ['project', 'management'],
      },
      {
        id: 4,
        title: 'Marketing Campaign Setup',
        dateCreated: '2024-01-05',
        category: 'Marketing',
        tags: ['campaign', 'marketing'],
      },
    ];
    
    setSOPs([...defaultSOPs, ...savedSOPs]);
  }, []);

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sop.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || sop.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: number) => {
    const updatedSOPs = sops.filter(sop => sop.id !== id);
    setSOPs(updatedSOPs);
    
    // Update localStorage
    const savedSOPs = updatedSOPs.filter(sop => sop.id > 4); // Keep only user-created SOPs
    localStorage.setItem('user-sops', JSON.stringify(savedSOPs));
    
    toast({
      title: "SOP Deleted",
      description: "The SOP has been successfully deleted.",
    });
  };

  const handleView = (sop: SOP) => {
    toast({
      title: "Opening SOP",
      description: `Viewing ${sop.title}`,
    });
    // Here you could open a modal or navigate to a detailed view
  };

  const handleEdit = (sop: SOP) => {
    toast({
      title: "Edit Feature",
      description: "SOP editing functionality will be available soon!",
    });
  };

  const handleExport = (sop: SOP) => {
    toast({
      title: "Export Feature",
      description: "SOP export functionality will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">My SOPs</h1>
        <div className="text-sm text-muted-foreground">
          {filteredSOPs.length} SOP{filteredSOPs.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search SOPs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="IT">Information Technology</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SOPs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSOPs.map((sop) => (
          <Card key={sop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{sop.title}</CardTitle>
                <Badge variant="outline">{sop.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(sop.dateCreated).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {sop.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleView(sop)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(sop)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleExport(sop)}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(sop.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSOPs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No SOPs found matching your criteria.</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter settings.' 
                : 'Create your first SOP to get started!'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MySOPs;
