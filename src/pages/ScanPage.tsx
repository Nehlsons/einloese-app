
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);

  const startScanning = () => {
    // In a real implementation, this would activate the camera
    setScanning(true);
    // For now, we'll simulate finding a voucher after 2 seconds
    setTimeout(() => {
      setScanning(false);
      window.location.href = '/voucher-details';
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm mb-8">
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold mb-6">QR-CODE SCANNEN</h1>
            
            <div className={`aspect-square bg-gray-100 mb-6 rounded-lg flex items-center justify-center ${scanning ? 'border-4 border-blue-500' : ''}`}>
              {scanning ? (
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Scanning...</p>
                  <div className="animate-pulse">
                    <QrCode size={64} className="mx-auto text-blue-500" />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode size={64} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">QR-Code im Bild platzieren</p>
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
                  QR-Code scannen
                </Button>
              ) : (
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 flex items-center justify-center gap-2"
                  onClick={() => setScanning(false)}
                >
                  Scannen abbrechen
                </Button>
              )}
              
              <Link to="/">
                <Button variant="outline" className="w-full border-gray-300 py-3 flex items-center justify-center gap-2">
                  <ArrowLeft size={20} />
                  Zurück zur Startseite
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
