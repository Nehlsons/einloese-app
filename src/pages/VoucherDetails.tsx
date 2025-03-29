
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Gift, QrCode, ArrowLeft, Info, Calendar } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { getVoucherDetails, VoucherResponse } from "@/services/voucherService";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export default function VoucherDetails() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [voucherDetails, setVoucherDetails] = useState<VoucherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

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
  const formattedTotalValue = new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(voucher.totalValue);
  
  const formattedAvailableValue = new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(voucher.availableValue);

  // Format expiry date based on language
  const expiryDate = new Date(voucher.validUntil);
  const formattedExpiryDate = new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(expiryDate);

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
          <h1 className="text-xl font-bold">{t('voucherDetails')}</h1>
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
            
            <div className="bg-blue-500 text-white p-3 mb-3">
              <p className="flex justify-between">
                <span>{t('availableValue')}:</span>
                <span>{formattedAvailableValue}</span>
              </p>
            </div>

            <div className="mb-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{t('validUntil')}: {formattedExpiryDate}</span>
            </div>
            
            {!voucher.redeemed && voucher.availableValue > 0 ? (
              <div className="flex flex-col items-center mb-4">
                <div className="bg-green-500 rounded-full p-3 mb-3">
                  <Check size={24} className="text-white" />
                </div>
                <p className="text-gray-800 font-medium">{t('voucherIsValid')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center mb-4">
                <div className="bg-red-500 rounded-full p-3 mb-3">
                  <X size={24} className="text-white" />
                </div>
                <p className="text-gray-800 font-medium">{t('voucherAlreadyRedeemed')}</p>
              </div>
            )}

            <Collapsible open={showInfo} onOpenChange={setShowInfo} className="mt-4 border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-100 p-3 text-left">
                <span className="flex items-center gap-2">
                  <Info size={16} />
                  <span>{t('voucherInformation')}</span>
                </span>
                <span>{showInfo ? '−' : '+'}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 text-left text-sm space-y-2 bg-gray-50">
                <div className="flex items-start gap-2">
                  <Checkbox id="fragmentable" checked={voucher.fragmentable} disabled className="mt-1" />
                  <label htmlFor="fragmentable" className="text-sm">
                    <span className="font-medium">{t('fragmentable')}</span>: {t('fragmentableDescription')}
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="appointment" checked={voucher.isAppointment} disabled className="mt-1" />
                  <label htmlFor="appointment" className="text-sm">
                    <span className="font-medium">{t('isAppointment')}</span>: {t('appointmentDescription')}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('voucherCode')}: {voucher.code}
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Card>
        
        <div className="bg-blue-500 p-4 rounded-lg text-white mb-4 relative">
          <button className="absolute top-2 right-2">
            <X size={20} />
          </button>
          
          <div className="space-y-3">
            {!voucher.redeemed && voucher.availableValue > 0 && (
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
                onClick={() => navigate(`/redemption-success?code=${voucher.code}&amount=${voucher.availableValue}`)}
              >
                <Gift size={20} />
                {t('redeemFull')}
              </Button>
            )}
            
            {!voucher.redeemed && voucher.availableValue > 0 && voucher.fragmentable && (
              <Link to={`/partial-redeem?code=${voucher.code}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                  <Gift size={20} />
                  {t('redeemPart')}
                </Button>
              </Link>
            )}

            <Link to="/scan">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                <QrCode size={20} />
                {t('scanAnotherVoucher')}
              </Button>
            </Link>
            
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
