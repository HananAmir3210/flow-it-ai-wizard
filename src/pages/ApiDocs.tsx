
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, Book, Key, Zap } from 'lucide-react';

const ApiDocs = () => {
  return (
    <Layout title="API Documentation">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Integrate FlowForge into your applications with our comprehensive REST API. 
            Build custom workflows and automate SOP generation programmatically.
          </p>
        </div>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-6 w-6" />
              <span>Quick Start</span>
            </CardTitle>
            <CardDescription>
              Get started with the FlowForge API in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Base URL</h3>
              <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded block">
                https://api.flowforge.com/v1
              </code>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                All API requests require authentication using an API key in the header:
              </p>
              <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded block">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-6 w-6" />
                <span>Endpoints</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">POST /sops</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Create a new SOP from a text description
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
                  {`{
  "title": "Customer Onboarding",
  "description": "Process for onboarding new customers",
  "industry": "SaaS"
}`}
                </code>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">GET /sops</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Retrieve all SOPs for your account
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">GET /sops/:id</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Retrieve a specific SOP by ID
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">PUT /sops/:id</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Update an existing SOP
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-red-600 mb-2">DELETE /sops/:id</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Delete a SOP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-6 w-6" />
                <span>Response Format</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Success Response</h4>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded block">
                    {`{
  "success": true,
  "data": {
    "id": "sop_123456",
    "title": "Customer Onboarding",
    "status": "completed",
    "steps": [
      {
        "number": 1,
        "title": "Initial Contact",
        "description": "...",
        "details": ["..."]
      }
    ],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  }
}`}
                  </code>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Error Response</h4>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded block">
                    {`{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Description is required",
    "details": "..."
  }
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rate Limits & API Keys */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-6 w-6" />
                <span>API Keys</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Generate and manage your API keys from your dashboard. Each key provides access to your account's SOPs and has configurable permissions.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Security Note:</strong> Keep your API keys secure and never expose them in client-side code.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Free Plan:</span>
                  <span className="font-medium">100 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Pro Plan:</span>
                  <span className="font-medium">1,000 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Enterprise:</span>
                  <span className="font-medium">Custom limits</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Rate limit headers are included in all responses to help you track your usage.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SDKs and Examples */}
        <Card>
          <CardHeader>
            <CardTitle>SDKs and Code Examples</CardTitle>
            <CardDescription>
              We provide SDKs for popular programming languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">JavaScript/Node.js</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Official SDK for JavaScript and Node.js applications
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  npm install @flowforge/sdk
                </code>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Python</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Python SDK with full API coverage
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  pip install flowforge-python
                </code>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">cURL</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Direct HTTP requests for any language
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  curl examples
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ApiDocs;
