
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  language: string;
  onBackClick: () => void;
}

export const PageHeader = ({ language, onBackClick }: PageHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <Button 
        variant="ghost" 
        className="p-2 mr-2" 
        onClick={onBackClick}
      >
        <ArrowLeft size={20} />
      </Button>
      <h1 className="text-xl font-bold">
        {language === 'de' ? 'Gutschein aufladen' : 'Reload Voucher'}
      </h1>
    </div>
  );
};
