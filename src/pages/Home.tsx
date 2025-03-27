
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm mb-8">
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-1">GUTSCHEIN- UND TICKETSCANNER</h1>
            <p className="text-gray-600 mb-6">
              Schnell und einfach Gutscheine einlösen, prüfen und aufladen sowie Tickets prüfen & entwerten.
            </p>
            
            <div className="space-y-3">
              <Link to="/scan">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2">
                  <QrCode size={20} />
                  QR-Code scannen
                </Button>
              </Link>
              
              <Link to="/reload">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2">
                  <Gift size={20} />
                  Gutschein aufladen
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full border-gray-300 py-3">
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
