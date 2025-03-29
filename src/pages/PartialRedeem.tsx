
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gift, ArrowLeft, X, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getVoucherDetails, redeemVoucher, VoucherResponse } from "@/services/voucherService";

export default function PartialRedeem() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [redeemAmount, setRedeemAmount] = useState("");
  const [voucherDetails, setVoucherDetails] = useState<VoucherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  // Get voucher code from URL query params or use a default
  const searchParams = new URLSearchParams(location.search);
  const voucherCode = searchParams.get('code') || "18652626117825936623";

  useEffect(() => {
    const fetchVoucherDetails = async () => {
      try {
        setLoading(true);
        const response = await getVoucherDetails(voucherCode);
        setVoucherDetails(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching voucher details:", err);
        setError(t('errorFetchingVoucher'));
      } finally {
        setLoading(false);
      }
    };

    fetchVoucherDetails();
  }, [voucherCode, t]);

  const handleRedeem = async () => {
    setInputError(null);
    
    // Validate amount
    const amount = parseFloat(redeemAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) {
      setInputError(t('invalidAmount'));
      return;
    }

    if (!voucherDetails || amount > voucherDetails.voucher.availableValue) {
      setInputError(t('amountExceedsAvailable'));
      return;
    }

    try {
      await redeemVoucher(voucherCode, amount);
      navigate(`/redemption-success?code=${voucherCode}&amount=${amount}`);
    } catch (err) {
      console.error("Error redeeming voucher:", err);
      setError(t('errorRedeemingVoucher'));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 text-center">
          <p>{t('loading')}...</p>
        </div>
      </Layout>
    );
  }

  if (error || !voucherDetails) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-red-500">{error || t('voucherNotFound')}</p>
          <Button 
            className="mt-4 bg-blue-500 hover:bg-blue-600" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} className="mr-2" />
            {t('goToHomepage')}
          </Button>
        </div>
      </Layout>
    );
  }

  const { voucher } = voucherDetails;
  
  // Format values based on language
  const formattedTotalValue = new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(voucher.totalValue);
  
  const formattedAvailableValue = new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(voucher.availableValue);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="p-2 mr-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">{t('partialRedemption')}</h1>
        </div>

        <Card className="bg-white shadow-sm mb-4">
          <div className="p-4 text-center">
            <p className="text-gray-700 mb-3">{voucher.type}</p>
            
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
              {inputError && (
                <p className="text-red-500 text-sm mt-2">{inputError}</p>
              )}
              <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                <Info size={14} />
                {t('useCommaOrDot')}
              </p>
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
              disabled={!redeemAmount || !!inputError}
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
