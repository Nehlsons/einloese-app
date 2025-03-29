
import { QrCode, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface ScannerViewProps {
  language: string;
  scanning: boolean;
  scanProgress: number;
  startScanning: () => void;
  stopScanning: () => void;
  switchToManualEntry: () => void;
}

export const ScannerView = ({
  language,
  scanning,
  scanProgress,
  startScanning,
  stopScanning,
  switchToManualEntry,
}: ScannerViewProps) => {
  return (
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
              onClick={stopScanning}
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
  );
};
