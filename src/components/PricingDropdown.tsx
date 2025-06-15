
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingDropdown: React.FC<PricingDropdownProps> = ({ isOpen, onClose }) => {
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      description: "Basic SOP generation",
      features: ["3 SOPs/month", "Limited workflows", "Basic templates"],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Pro Plan",
      price: "$19/month",
      description: "Unlimited SOPs, all features unlocked",
      features: ["Unlimited SOPs", "All workflows", "Advanced templates", "Priority support"],
      buttonText: "Select Plan",
      highlighted: true
    },
    {
      name: "Team Plan",
      price: "$49/month",
      description: "Everything in Pro + collaboration & team sharing",
      features: ["Everything in Pro", "Team collaboration", "Shared workspaces", "Admin controls"],
      buttonText: "Select Plan",
      highlighted: false
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown Card */}
      <div className="absolute top-full right-0 mt-2 z-50 w-[600px] max-w-[90vw]">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">Choose Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    plan.highlighted 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      console.log(`Selected ${plan.name}`);
                      onClose();
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                onClick={() => {
                  console.log('Compare all features clicked');
                  onClose();
                }}
              >
                Compare All Features →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PricingDropdown;
