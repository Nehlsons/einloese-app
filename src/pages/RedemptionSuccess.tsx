import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, QrCode, ArrowLeft, X, Gift } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { getVoucherDetails, VoucherResponse } from "@/services/voucherService";

export default function RedemptionSuccess() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [voucherDetails, setVoucherDetails] = useState<VoucherResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const voucherCode = searchParams.get('code') || "";
  const redeemedAmount = parseFloat(searchParams.get('amount') || "0");

  const formattedRedeemedAmount = new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(redeemedAmount);

  useEffect(() => {
    const fetchVoucherDetails = async () => {
      try {
        setLoading(true);
        const response = await getVoucherDetails(voucherCode);
        setVoucherDetails(response);
      } catch (err) {
        console.error("Error fetching voucher details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (voucherCode) {
      fetchVoucherDetails();
    }
  }, [voucherCode]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 text-center">
          <p>{t('loading')}...</p>
        </div>
      </Layout>
    );
  }

  const fullyRedeemed = voucherDetails?.voucher?.availableValue === 0 || 
                         redeemedAmount >= (voucherDetails?.voucher?.availableValue || 0);
  
  const formattedTotalValue = voucherDetails?.voucher ? 
    new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(voucherDetails.voucher.totalValue) : "0,00 €";
  
  const formattedAvailableValue = voucherDetails?.voucher ? 
    new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(voucherDetails.voucher.availableValue - redeemedAmount) : "0,00 €";

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
          <h1 className="text-xl font-bold">{t('redemptionSuccess')}</h1>
        </div>

        <Card className="bg-white shadow-sm mb-4">
          <div className="p-4 text-center">
            <p className="text-gray-700 mb-3">
              {voucherDetails?.voucher?.type || t('voucher')}
            </p>
            
            <div className="bg-gray-700 text-white p-3 mb-1">
              <p className="flex justify-between">
                <span>{t('totalValue')}:</span>
                <span>{formattedTotalValue}</span>
              </p>
            </div>
            
            <div className="bg-blue-500 text-white p-3 mb-6">
              <p className="flex justify-between">
                <span>{t('availableValue')}:</span>
                <span>{formattedAvailableValue}</span>
              </p>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-500 rounded-full p-3 mb-3">
                <Check size={24} className="text-white" />
              </div>
              {fullyRedeemed ? (
                <p className="text-gray-800 font-medium">{t('voucherRedeemed')}</p>
              ) : (
                <p className="text-gray-800 font-medium">
                  {t('partiallyRedeemed').replace('{{amount}}', formattedRedeemedAmount)}
                </p>
              )}
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-500 p-4 rounded-lg text-white mb-4 relative">
          <button className="absolute top-2 right-2">
            <X size={20} />
          </button>
          
          <div className="space-y-3">
            {!fullyRedeemed && voucherDetails?.voucher?.fragmentable && (
              <Link to={`/partial-redeem?code=${voucherCode}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                  <Gift size={20} />
                  {t('redeemPart')}
                </Button>
              </Link>
            )}
            
            <Link to="/scan">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                <QrCode size={20} />
                {t('scanVoucher')}
              </Button>
            </Link>
            
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                {t('goToHomepage')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
