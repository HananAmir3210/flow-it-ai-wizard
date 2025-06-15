
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';

const MySOPs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sops = [
    {
      id: 1,
      title: 'Customer Onboarding Process',
      category: 'Operations',
      dateCreated: '2024-01-15',
      tags: ['onboarding', 'customer', 'process'],
      status: 'Active',
    },
    {
      id: 2,
      title: 'Marketing Campaign Launch',
      category: 'Marketing',
      dateCreated: '2024-01-10',
      tags: ['marketing', 'campaign', 'launch'],
      status: 'Draft',
    },
    {
      id: 3,
      title: 'Employee Training Protocol',
      category: 'HR',
      dateCreated: '2024-01-08',
      tags: ['training', 'employee', 'hr'],
      status: 'Active',
    },
    {
      id: 4,
      title: 'Quality Assurance Checklist',
      category: 'Operations',
      dateCreated: '2024-01-05',
      tags: ['qa', 'quality', 'checklist'],
      status: 'Active',
    },
  ];

  const filteredSOPs = sops.filter(sop =>
    sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sop.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My SOPs</h1>
          <p className="text-muted-foreground">Manage and organize your standard operating procedures</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Create New SOP</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search SOPs by title, category, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SOPs List */}
      <div className="space-y-4">
        {filteredSOPs.map((sop) => (
          <Card key={sop.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{sop.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sop.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sop.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>Category: {sop.category}</span>
                    <span>Created: {new Date(sop.dateCreated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sop.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSOPs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No SOPs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first SOP'}
            </p>
            <Button>Create Your First SOP</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MySOPs;
