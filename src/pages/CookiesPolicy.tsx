
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiesPolicy = () => {
  return (
    <Layout title="Cookies Policy">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Cookies Policy</CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how users interact with their sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                FlowForge uses cookies to enhance your experience on our platform and to help us understand how our Service is being used. We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Authentication and security</li>
                <li>Storing user preferences and settings</li>
                <li>Analytics and performance monitoring</li>
                <li>Personalizing content and features</li>
                <li>Improving our Service and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, our Service cannot function properly.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                <li>Authentication tokens</li>
                <li>Session management</li>
                <li>Security preferences</li>
                <li>Load balancing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.2 Performance Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies collect anonymous information about how visitors use our website, helping us improve performance and user experience.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                <li>Page load times</li>
                <li>Error tracking</li>
                <li>Usage patterns</li>
                <li>Feature adoption metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.3 Functional Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                These cookies allow the website to remember choices you make and provide enhanced, more personal features.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                <li>Language preferences</li>
                <li>Theme settings (dark/light mode)</li>
                <li>Dashboard layout preferences</li>
                <li>Recently used templates</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.4 Analytics Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We use analytics cookies to understand how users interact with our Service, which helps us improve our platform.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                <li>Google Analytics</li>
                <li>Mixpanel (product analytics)</li>
                <li>Hotjar (user behavior analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We may also use third-party services that set their own cookies. These include:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Used to analyze website traffic and user behavior. 
                    <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Google Privacy Policy
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stripe</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Used for payment processing and fraud prevention. 
                    <a href="https://stripe.com/privacy" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Stripe Privacy Policy
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Intercom</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Used for customer support and communication. 
                    <a href="https://www.intercom.com/legal/privacy" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Intercom Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.1 Browser Settings</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete existing cookies</li>
                <li>Block cookies from being set</li>
                <li>Set preferences for specific websites</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5.2 FlowForge Cookie Settings</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie consent banner that allows you to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Accept all cookies</li>
                <li>Customize your preferences</li>
                <li>Reject non-essential cookies</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                You can change your cookie preferences at any time by accessing the cookie settings in your account dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Please note that disabling certain cookies may impact your experience on our platform:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Essential cookies: Disabling these will prevent the Service from functioning properly</li>
                <li>Functional cookies: You may lose personalized settings and preferences</li>
                <li>Analytics cookies: This won't affect functionality but helps us improve our Service</li>
                <li>Performance cookies: May result in slower load times or reduced functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Cookie Retention</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Different types of cookies are stored for different periods:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain until they expire or you delete them</li>
                <li><strong>Authentication cookies:</strong> Typically expire after 30 days of inactivity</li>
                <li><strong>Preference cookies:</strong> Stored for up to 1 year</li>
                <li><strong>Analytics cookies:</strong> Usually stored for 24 months</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies or this Cookies Policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email:</strong> privacy@flowforge.com<br />
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94107<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CookiesPolicy;
