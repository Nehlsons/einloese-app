
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card rounded-2xl p-6 card-hover animate-scale-in opacity-0" 
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="heading-sm mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
