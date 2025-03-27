
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Gift, QrCode, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function VoucherDetails() {
  const voucher = {
    type: "Beratungstermin",
    totalValue: "499,00 €",
    availableValue: "499,00 €",
    isValid: true,
    isAppointment: true,
    fragmentable: true,
    redeemed: false
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-white shadow-sm mb-4">
          <div className="p-4 text-center">
            <p className="text-gray-700 mb-3">{voucher.type}</p>
            
            <div className="bg-gray-700 text-white p-3 mb-1">
              <p className="flex justify-between">
                <span>Gesamtwert:</span>
                <span>{voucher.totalValue}</span>
              </p>
            </div>
            
            <div className="bg-blue-500 text-white p-3 mb-6">
              <p className="flex justify-between">
                <span>Noch verfügbar:</span>
                <span>{voucher.availableValue}</span>
              </p>
            </div>
            
            {voucher.isValid && (
              <div className="flex flex-col items-center mb-6">
                <div className="bg-green-500 rounded-full p-3 mb-3">
                  <Check size={24} className="text-white" />
                </div>
                <p className="text-gray-800 font-medium">Der Gutschein ist gültig</p>
              </div>
            )}
          </div>
        </Card>
        
        <div className="bg-blue-500 p-4 rounded-lg text-white mb-4 relative">
          <button className="absolute top-2 right-2">
            <X size={20} />
          </button>
          
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
              <Gift size={20} />
              Gutschein einlösen
            </Button>
            
            {voucher.fragmentable && (
              <Link to="/partial-redeem">
                <Button variant="outline" className="w-full border-white border-2 text-white hover:bg-blue-600 py-3">
                  Gutschein Teileinlösung
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
