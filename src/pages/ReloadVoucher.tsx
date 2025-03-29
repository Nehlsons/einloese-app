import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, QrCode, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ReloadVoucher() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [scanning, setScanning] = useState(true);

  const handleReload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!voucherCode.trim()) {
      toast.error(language === 'de' ? "Bitte geben Sie einen Gutscheincode ein" : "Please enter a voucher code");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(language === 'de' ? "Bitte geben Sie einen gültigen Betrag ein" : "Please enter a valid amount");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        language === 'de' 
          ? `Gutschein ${voucherCode} wurde mit ${amount}€ aufgeladen` 
          : `Voucher ${voucherCode} has been reloaded with €${amount}`
      );
      navigate("/");
    }, 1500);
  };

  const startScanning = () => {
    setScanning(true);
    setShowManualEntry(false);
    
    // Simulate finding a voucher after 2 seconds
    setTimeout(() => {
      setScanning(false);
      // Mock a voucher code
      const mockVoucherCode = "GW" + Math.floor(10000000 + Math.random() * 90000000);
      setVoucherCode(mockVoucherCode);
      toast.success(
        language === 'de'
          ? `Gutschein ${mockVoucherCode} gefunden`
          : `Voucher ${mockVoucherCode} found`
      );
      setShowManualEntry(true);
    }, 2000);
  };

  const switchToManualEntry = () => {
    setScanning(false);
    setShowManualEntry(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="p-2 mr-2" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">
            {language === 'de' ? 'Gutschein aufladen' : 'Reload Voucher'}
          </h1>
        </div>

        {!showManualEntry ? (
          <Card className="bg-white shadow-sm mb-6">
            <div className="p-6 text-center">
              <h2 className="text-lg font-medium mb-4">
                {language === 'de' ? 'QR-CODE SCANNEN' : 'SCAN QR CODE'}
              </h2>
              
              <div className="aspect-square bg-gray-100 mb-6 rounded-lg flex items-center justify-center border-4 border-blue-500">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">
                    {language === 'de' ? 'Scannen...' : 'Scanning...'}
                  </p>
                  <div className="animate-pulse">
                    <QrCode size={64} className="mx-auto text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
                  onClick={switchToManualEntry}
                >
                  {language === 'de' ? 'Manuell eingeben' : 'Enter Manually'}
                </Button>
                
                <Link to="/">
                  <Button 
                    variant="default" 
                    className="w-full py-3 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    {language === 'de' ? 'Zur Startseite' : 'Back to Home'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
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
                    variant="default" 
                    className="w-full py-3 flex items-center justify-center gap-2"
                  >
                    {language === 'de' ? 'Zur Startseite' : 'Back to Home'}
                  </Button>
                </Link>
              </form>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
