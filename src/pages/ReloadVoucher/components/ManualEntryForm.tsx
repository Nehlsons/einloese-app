
import { CreditCard, QrCode, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface ManualEntryFormProps {
  language: string;
  voucherCode: string;
  amount: string;
  setVoucherCode: (code: string) => void;
  setAmount: (amount: string) => void;
  handleReload: (e: React.FormEvent) => void;
  startScanning: () => void;
  isLoading: boolean;
}

export const ManualEntryForm = ({
  language,
  voucherCode,
  amount,
  setVoucherCode,
  setAmount,
  handleReload,
  startScanning,
  isLoading,
}: ManualEntryFormProps) => {
  return (
    <Card className="bg-white shadow-sm mb-6">
      <div className="p-6">
        <form onSubmit={handleReload} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="voucher-code">
              {language === 'de' ? 'Gutscheincode' : 'Voucher Code'}
            </Label>
            <div className="flex space-x-2">
              <Input
                id="voucher-code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder={language === 'de' ? 'Geben Sie den Code ein' : 'Enter voucher code'}
                required
                className="flex-1"
              />
              <Button 
                type="button"
                onClick={startScanning}
                variant="outline"
                className="flex-shrink-0"
              >
                <QrCode size={20} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">
              {language === 'de' ? 'Betrag (€)' : 'Amount (€)'}
            </Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <CreditCard size={20} />
            {isLoading 
              ? (language === 'de' ? 'Wird verarbeitet...' : 'Processing...') 
              : (language === 'de' ? 'Gutschein aufladen' : 'Reload Voucher')}
          </Button>
          
          <Link to="/">
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              {language === 'de' ? 'Zur Startseite' : 'Back to Home'}
            </Button>
          </Link>
        </form>
      </div>
    </Card>
  );
};
