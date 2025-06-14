
import React, { useState } from 'react';
import { X, CreditCard, Lock, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: {
    name: string;
    price: string;
    interval?: string;
    features?: string[];
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = {
    name: "Pro",
    price: "$29",
    interval: "month",
    features: ["Unlimited SOPs", "Advanced workflows", "Team collaboration"]
  }
}) => {
  const [email, setEmail] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!cvc.trim()) {
      newErrors.cvc = 'CVC is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Here you would integrate with Stripe
      // const { error, paymentMethod } = await stripe.createPaymentMethod({...})
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful payment
      console.log('Payment successful');
      onClose();
    } catch (error) {
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, '');
    
    // Add slash after 2 digits
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // Max length with spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) { // MM/YY format
      setExpiryDate(formatted);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCvc(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-hidden animate-in slide-in-from-right-5 duration-300">
        <Card className="border-0 shadow-2xl">
          {/* Header */}
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl dark:text-white">Complete Your Purchase</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Plan Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Plan Summary</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium dark:text-white">{selectedPlan.name} Plan</span>
                    {selectedPlan.name === "Pro" && (
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg dark:text-white">
                      {selectedPlan.price}
                      {selectedPlan.interval && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          /{selectedPlan.interval}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {selectedPlan.features && (
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock size={16} />
                Payment Information
              </h3>
              
              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Name on Card */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name on Card
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className={errors.nameOnCard ? 'border-red-500' : ''}
                />
                {errors.nameOnCard && (
                  <p className="text-xs text-red-500">{errors.nameOnCard}</p>
                )}
              </div>

              {/* Card Information */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Information
                </label>
                
                {/* Card Number */}
                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                    />
                    <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-xs text-red-500">{errors.cardNumber}</p>
                  )}
                </div>
                
                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && (
                      <p className="text-xs text-red-500">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="text"
                      placeholder="CVC"
                      value={cvc}
                      onChange={handleCvcChange}
                      className={errors.cvc ? 'border-red-500' : ''}
                    />
                    {errors.cvc && (
                      <p className="text-xs text-red-500">{errors.cvc}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Card Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="saveCard" className="text-sm text-gray-700 dark:text-gray-300">
                  Save this card for future payments
                </label>
              </div>

              {/* Payment Error */}
              {errors.payment && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.payment}</p>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Lock size={14} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your payment information is encrypted and secure. We use Stripe to process payments safely.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !email || !nameOnCard || !cardNumber || !expiryDate || !cvc}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Pay ${selectedPlan.price} Now`
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <HelpCircle size={14} className="mr-1" />
                  Need help?
                </Button>
              </div>
            </div>

            {/* Optional: Apple Pay / Google Pay */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Or pay with</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 max-w-[120px] border-gray-200 dark:border-gray-700"
                  disabled
                >
                  Apple Pay
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 max-w-[120px] border-gray-200 dark:border-gray-700"
                  disabled
                >
                  Google Pay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentModal;
