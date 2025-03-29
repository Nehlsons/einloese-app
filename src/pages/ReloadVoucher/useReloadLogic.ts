
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useReloadLogic = (language: string, setShowManualEntry: (value: boolean) => void) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reloadSuccess, setReloadSuccess] = useState(false);
  const [reloadedAmount, setReloadedAmount] = useState("");

  const handleReload = (e: React.FormEvent, voucherCode: string) => {
    e.preventDefault();
    
    if (!voucherCode.trim()) {
      toast.error(language === 'de' ? "Bitte geben Sie einen Gutscheincode ein" : "Please enter a voucher code");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(language === 'de' ? "Bitte geben Sie einen gültigen Betrag ein" : "Please enter a valid amount");
      return;
    }
    
    setIsLoading(true);
    setReloadedAmount(amount);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setReloadSuccess(true);
      toast.success(
        language === 'de' 
          ? `Gutschein ${voucherCode} wurde mit ${amount}€ aufgeladen` 
          : `Voucher ${voucherCode} has been reloaded with €${amount}`
      );
    }, 1500);
  };

  const resetForm = (setVoucherCode: (value: string) => void) => {
    setVoucherCode("");
    setAmount("");
    setReloadSuccess(false);
    setShowManualEntry(true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return {
    amount,
    setAmount,
    isLoading,
    reloadSuccess,
    reloadedAmount,
    handleReload,
    resetForm,
    handleBackToHome
  };
};
