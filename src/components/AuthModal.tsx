
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, confirmPassword: string) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginEmail) newErrors.loginEmail = "Email is required";
    if (!loginPassword) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!signupEmail) newErrors.signupEmail = "Email is required";
    if (!signupPassword) newErrors.signupPassword = "Password is required";
    if (signupPassword.length < 6) newErrors.signupPassword = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (signupPassword !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      onLogin(loginEmail, loginPassword);
      onClose();
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignup()) {
      onSignup(signupEmail, signupPassword, confirmPassword);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to AI SOP Generator</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={errors.loginEmail ? "border-red-500" : ""}
                    />
                    {errors.loginEmail && <p className="text-red-500 text-sm mt-1">{errors.loginEmail}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={errors.loginPassword ? "border-red-500" : ""}
                    />
                    {errors.loginPassword && <p className="text-red-500 text-sm mt-1">{errors.loginPassword}</p>}
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    Continue with Google
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    <a href="#" className="hover:underline">Forgot password?</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className={errors.signupEmail ? "border-red-500" : ""}
                    />
                    {errors.signupEmail && <p className="text-red-500 text-sm mt-1">{errors.signupEmail}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className={errors.signupPassword ? "border-red-500" : ""}
                    />
                    {errors.signupPassword && <p className="text-red-500 text-sm mt-1">{errors.signupPassword}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    Continue with Google
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    Already have an account? <a href="#" className="hover:underline">Login here</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
