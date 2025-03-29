
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, QrCode, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
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
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLines, setScanLines] = useState<number[]>([]);

  // Generate scan lines for animation
  useEffect(() => {
    if (scanning) {
      setScanLines([20, 40, 60, 80]);
      
      // Simulate scan progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      // Simulate finding a voucher after progress reaches 80%
      const timeout = setTimeout(() => {
        setScanning(false);
        const mockVoucherCode = "GW" + Math.floor(10000000 + Math.random() * 90000000);
        setVoucherCode(mockVoucherCode);
        toast.success(
          language === 'de'
            ? `Gutschein ${mockVoucherCode} gefunden`
            : `Voucher ${mockVoucherCode} found`
        );
        setShowManualEntry(true);
      }, 2000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [scanning, language]);

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
    setScanProgress(0);
    setScanning(true);
    setShowManualEntry(false);
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
              
              <div className="aspect-square bg-gray-100 mb-6 rounded-lg flex items-center justify-center border-4 border-blue-500 relative overflow-hidden">
                {scanning ? (
                  <>
                    <div className="absolute inset-0 bg-black bg-opacity-10">
                      {/* Scan line animation */}
                      <div 
                        className="absolute left-0 right-0 h-0.5 bg-blue-500 z-10 animate-pulse" 
                        style={{ 
                          top: `${scanProgress}%`, 
                          boxShadow: '0 0 10px rgba(59, 130, 246, 0.7), 0 0 20px rgba(59, 130, 246, 0.5)' 
                        }}
                      />
                      
                      {/* Corner markers */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                    </div>
                    
                    <div className="text-center relative z-20">
                      <p className="text-gray-800 mb-2 text-sm">
                        {language === 'de' ? 'Scannen...' : 'Scanning...'}
                      </p>
                      <div className="animate-pulse">
                        <QrCode size={64} className="mx-auto text-blue-500" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <QrCode size={64} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      {language === 'de' ? 'QR-Code im Bild platzieren' : 'Place QR Code in frame'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {!scanning ? (
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
                    onClick={startScanning}
                  >
                    <QrCode size={20} />
                    {language === 'de' ? 'QR-Code scannen' : 'Scan QR Code'}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 flex items-center justify-center gap-2"
                    onClick={() => setScanning(false)}
                  >
                    <X size={20} />
                    {language === 'de' ? 'Scannen abbrechen' : 'Cancel Scanning'}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 py-3 text-gray-700 flex items-center justify-center gap-2"
                  onClick={switchToManualEntry}
                >
                  {language === 'de' ? 'Manuell eingeben' : 'Enter Manually'}
                </Button>
                
                <Link to="/">
                  <Button 
                    variant="outline"
                    className="w-full border-gray-300 py-3 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
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
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={20} />
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
