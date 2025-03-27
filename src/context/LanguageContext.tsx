
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  de: {
    // Allgemein
    'home': 'Startseite',
    'scan': 'Scannen',
    'back': 'Zurück',
    
    // Gutschein-Informationen
    'totalValue': 'Gesamtwert',
    'availableValue': 'Noch verfügbar',
    'voucher': 'Gutschein',
    'voucherRedeemed': 'Der Gutschein wurde eingelöst',
    'partiallyRedeemed': 'Es wurden {{amount}} des Gutscheins eingelöst',
    
    // Aktionen
    'redeemPart': 'Gutschein-Teil einlösen',
    'scanVoucher': 'Gutschein scannen',
    'goToHomepage': 'Zur Startseite',
    'howMuchRedeem': 'Wie viel möchten Sie einlösen? Geben Sie einen Betrag in € ein!',
    'redeemAmount': 'Einlösewert',
    
    // Footer
    'contact': 'Kontakt/Hilfe',
    'imprint': 'Impressum',
    'privacy': 'Datenschutz',
  },
  en: {
    // General
    'home': 'Home',
    'scan': 'Scan',
    'back': 'Back',
    
    // Voucher Information
    'totalValue': 'Total Value',
    'availableValue': 'Still Available',
    'voucher': 'Voucher',
    'voucherRedeemed': 'The voucher has been redeemed',
    'partiallyRedeemed': '{{amount}} of the voucher has been redeemed',
    
    // Actions
    'redeemPart': 'Redeem part of voucher',
    'scanVoucher': 'Scan voucher',
    'goToHomepage': 'Go to homepage',
    'howMuchRedeem': 'How much would you like to redeem? Enter an amount in €!',
    'redeemAmount': 'Redemption value',
    
    // Footer
    'contact': 'Contact/Help',
    'imprint': 'Imprint',
    'privacy': 'Privacy',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Retrieve stored language or default to German
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' ? 'en' : 'de') as Language;
  });

  // Save language preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[language];
    
    // Return the translation or the key if not found
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
