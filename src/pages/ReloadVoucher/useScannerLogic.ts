
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useScannerLogic = (language: string) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Generate scan lines for animation
  useEffect(() => {
    if (scanning) {
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

  const startScanning = () => {
    setScanProgress(0);
    setScanning(true);
    setShowManualEntry(false);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  const switchToManualEntry = () => {
    setScanning(false);
    setShowManualEntry(true);
  };

  return {
    voucherCode,
    setVoucherCode,
    scanning,
    scanProgress,
    showManualEntry,
    setShowManualEntry,
    startScanning,
    stopScanning,
    switchToManualEntry
  };
};
