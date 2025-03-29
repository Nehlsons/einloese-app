
import { CheckCircle2, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SuccessViewProps {
  language: string;
  voucherCode: string;
  reloadedAmount: string;
  resetForm: () => void;
  handleBackToHome: () => void;
}

export const SuccessView = ({
  language,
  voucherCode,
  reloadedAmount,
  resetForm,
  handleBackToHome,
}: SuccessViewProps) => {
  return (
    <Card className="bg-white shadow-sm mb-6">
      <div className="p-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-green-600 mb-2">
          {language === 'de' ? 'Aufladung erfolgreich!' : 'Reload Successful!'}
        </h2>
        
        <p className="text-gray-600 mb-4">
          {language === 'de' 
            ? `Gutschein ${voucherCode} wurde mit ${reloadedAmount}€ aufgeladen.`
            : `Voucher ${voucherCode} has been reloaded with €${reloadedAmount}.`}
        </p>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">{language === 'de' ? 'Gutscheincode:' : 'Voucher Code:'}</span>
            <span className="font-medium">{voucherCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{language === 'de' ? 'Aufgeladener Betrag:' : 'Reloaded Amount:'}</span>
            <span className="font-medium text-green-600">€{reloadedAmount}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
            onClick={resetForm}
          >
            <CreditCard size={20} />
            {language === 'de' ? 'Weiteren Gutschein aufladen' : 'Reload Another Voucher'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 py-3 flex items-center justify-center gap-2"
            onClick={handleBackToHome}
          >
            <ArrowLeft size={20} />
            {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
