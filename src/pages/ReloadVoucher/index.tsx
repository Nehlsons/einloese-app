
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "./components/PageHeader";
import { ScannerView } from "./components/ScannerView";
import { ManualEntryForm } from "./components/ManualEntryForm";
import { SuccessView } from "./components/SuccessView";
import { useScannerLogic } from "./useScannerLogic";
import { useReloadLogic } from "./useReloadLogic";
import { ArrowLeft } from "lucide-react";

export default function ReloadVoucher() {
  const { language } = useLanguage();
  
  const {
    voucherCode,
    setVoucherCode,
    scanning,
    scanProgress,
    showManualEntry,
    setShowManualEntry,
    startScanning,
    stopScanning,
    switchToManualEntry
  } = useScannerLogic(language);

  const {
    amount,
    setAmount,
    isLoading,
    reloadSuccess,
    reloadedAmount,
    handleReload,
    resetForm,
    handleBackToHome
  } = useReloadLogic(language, setShowManualEntry);

  const handleReloadSubmit = (e: React.FormEvent) => {
    handleReload(e, voucherCode);
  };

  const handleResetForm = () => {
    resetForm(setVoucherCode);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <PageHeader 
          language={language} 
          onBackClick={handleBackToHome}
        />

        {reloadSuccess ? (
          <SuccessView 
            language={language}
            voucherCode={voucherCode}
            reloadedAmount={reloadedAmount}
            resetForm={handleResetForm}
            handleBackToHome={handleBackToHome}
          />
        ) : !showManualEntry ? (
          <ScannerView 
            language={language}
            scanning={scanning}
            scanProgress={scanProgress}
            startScanning={startScanning}
            stopScanning={stopScanning}
            switchToManualEntry={switchToManualEntry}
          />
        ) : (
          <ManualEntryForm 
            language={language}
            voucherCode={voucherCode}
            amount={amount}
            setVoucherCode={setVoucherCode}
            setAmount={setAmount}
            handleReload={handleReloadSubmit}
            startScanning={startScanning}
            isLoading={isLoading}
          />
        )}
      </div>
    </Layout>
  );
}
