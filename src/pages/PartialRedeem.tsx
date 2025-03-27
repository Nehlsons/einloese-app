
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gift, ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function PartialRedeem() {
  const { t } = useLanguage();
  const [redeemAmount, setRedeemAmount] = useState("");
  const voucher = {
    type: "Beratungstermin",
    totalValue: "499,00 €",
    availableValue: "499,00 €"
  };

  const handleRedeem = () => {
    // In a real app, this would send data to an API
    window.location.href = '/redemption-success';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-white shadow-sm mb-4">
          <div className="p-4 text-center">
            <p className="text-gray-700 mb-3">{voucher.type}</p>
            
            <div className="bg-gray-700 text-white p-3 mb-1">
              <p className="flex justify-between">
                <span>{t('totalValue')}:</span>
                <span>{voucher.totalValue}</span>
              </p>
            </div>
            
            <div className="bg-blue-500 text-white p-3 mb-6">
              <p className="flex justify-between">
                <span>{t('availableValue')}:</span>
                <span>{voucher.availableValue}</span>
              </p>
            </div>
            
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-3">
                {t('howMuchRedeem')}
              </p>
              <Input 
                type="text" 
                placeholder={t('redeemAmount')} 
                className="border-gray-300 text-center"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
              />
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-500 p-4 rounded-lg text-white mb-4 relative">
          <button className="absolute top-2 right-2">
            <X size={20} />
          </button>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
              onClick={handleRedeem}
              disabled={!redeemAmount}
            >
              <Gift size={20} />
              {t('redeemPart')}
            </Button>
            
            <Link to="/">
              <Button variant="outline" className="w-full border-white border-2 text-white hover:bg-blue-600 py-3">
                {t('goToHomepage')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
