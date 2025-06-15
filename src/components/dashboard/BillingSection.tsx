
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Star, Check } from 'lucide-react';

const BillingSection = () => {
  const currentPlan = {
    name: 'Pro Plan',
    price: '$29',
    period: 'month',
    features: [
      'Unlimited SOPs',
      'Advanced Workflows',
      'Priority Support',
      'Export Options',
      'Team Collaboration'
    ]
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: ['5 SOPs', 'Basic Workflows', 'Email Support'],
      current: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: ['Unlimited SOPs', 'Advanced Workflows', 'Priority Support', 'Export Options'],
      current: true,
      popular: true,
    },
    {
      name: 'Team',
      price: '$99',
      period: 'month',
      features: ['Everything in Pro', 'Team Collaboration', 'Admin Dashboard', 'Custom Integrations'],
      current: false,
    },
  ];

  const invoices = [
    { id: 'INV-001', date: '2024-01-15', amount: '$29.00', status: 'Paid' },
    { id: 'INV-002', date: '2023-12-15', amount: '$29.00', status: 'Paid' },
    { id: 'INV-003', date: '2023-11-15', amount: '$29.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Plan</span>
            <Badge variant="default">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
              <p className="text-muted-foreground">
                {currentPlan.price}/{currentPlan.period} • Renews on February 15, 2024
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentPlan.price}</div>
              <div className="text-sm text-muted-foreground">per {currentPlan.period}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Plan Features:</h4>
            <ul className="space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <Check size={16} className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-2 mt-6">
            <Button variant="outline">Manage Subscription</Button>
            <Button variant="outline">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className={`border rounded-lg p-6 relative ${plan.current ? 'border-blue-500 bg-blue-50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star size={12} className="mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold mt-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">per {plan.period}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <Check size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.current ? 'secondary' : 'default'}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade to ' + plan.name}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard size={20} />
            <span>Payment Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/25</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-muted-foreground">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium">{invoice.amount}</div>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSection;
