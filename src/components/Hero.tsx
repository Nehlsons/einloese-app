
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="heading-xl text-balance mb-6 animate-slide-down opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Beautiful design meets <span className="text-primary">powerful functionality</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-slide-down opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Create stunning experiences with minimal effort. Designed for those who appreciate beauty and simplicity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-down opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Link
              to="/get-started"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/learn-more"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-3 px-8 rounded-full transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl glass-card animate-float">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 w-full h-full flex items-center justify-center">
                  <div className="text-muted-foreground">App Preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};
