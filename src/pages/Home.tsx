
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const {
    t,
    language
  } = useLanguage();
  
  return <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm mb-8">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-1">
              {language === 'de' ? 'GUTSCHEIN- UND TICKETSCANNER' : 'VOUCHER AND TICKET SCANNER'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'de' ? 'Schnell und einfach Gutscheine einlösen, prüfen und aufladen sowie Tickets prüfen & entwerten.' : 'Quickly and easily redeem, check and reload vouchers as well as check & validate tickets.'}
            </p>
            
            <div className="space-y-3">
              <Link to="/scan">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2">
                  <QrCode size={20} />
                  {language === 'de' ? 'QR-Code scannen' : 'Scan QR Code'}
                </Button>
              </Link>
              
              <Link to="/reload">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2">
                  <Gift size={20} />
                  {language === 'de' ? 'Gutschein aufladen' : 'Reload Voucher'}
                </Button>
              </Link>
              
              <Link to="/team-sharing">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2">
                  <Users size={20} />
                  {language === 'de' ? 'Status mit Team teilen' : 'Share Status with Team'}
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full border-gray-300 py-3 text-sky-50 bg-blue-500 hover:bg-blue-400">
                {language === 'de' ? 'Logout' : 'Logout'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>;
}
