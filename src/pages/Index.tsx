
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { Cpu, Shield, Zap, RefreshCw, LineChart, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Features Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Designed with precision for exceptional experiences
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Every detail matters. We've meticulously crafted each feature to ensure a seamless and delightful user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap} 
              title="Lightning Fast" 
              description="Optimized for speed and performance. Your app will load instantly and run smoothly on any device."
              delay={0.3}
            />
            <FeatureCard 
              icon={Shield} 
              title="Secure by Design" 
              description="Built with security in mind. Your data is always protected with enterprise-grade encryption."
              delay={0.4}
            />
            <FeatureCard 
              icon={Smartphone} 
              title="Mobile Optimized" 
              description="Looks and works beautifully on all devices, from smartphones to desktop computers."
              delay={0.5}
            />
            <FeatureCard 
              icon={RefreshCw} 
              title="Seamless Updates" 
              description="Receive automatic updates with new features and improvements without any downtime."
              delay={0.6}
            />
            <FeatureCard 
              icon={Cpu} 
              title="Powerful Integration" 
              description="Connect with your favorite tools and services through our extensive API and integration options."
              delay={0.7}
            />
            <FeatureCard 
              icon={LineChart} 
              title="Detailed Analytics" 
              description="Gain valuable insights with comprehensive analytics and reporting tools."
              delay={0.8}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Ready to transform your digital experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Join thousands of satisfied users who have already made the switch. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <Link
                to="/get-started"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
              >
                Get Started Now
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-full shadow-sm transition-all duration-300"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
