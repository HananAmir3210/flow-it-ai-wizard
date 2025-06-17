
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 3 SOPs per month",
        "Basic AI generation",
        "PDF export",
        "Email support"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for small teams and growing businesses",
      features: [
        "Unlimited SOPs",
        "Advanced AI generation",
        "All export formats",
        "Visual workflow builder",
        "Team collaboration",
        "Priority support",
        "Custom templates"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment",
        "Custom training"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <Layout title="Pricing">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {plan.period}
                  </div>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 14-day free trial for the Pro plan. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
