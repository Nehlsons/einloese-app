
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
    'loading': 'Wird geladen',
    'voucherDetails': 'Gutschein-Details',
    'partialRedemption': 'Teileinlösung',
    'redemptionSuccess': 'Einlösung erfolgreich',
    'errorFetchingVoucher': 'Fehler beim Abrufen des Gutscheins',
    'voucherNotFound': 'Gutschein nicht gefunden',
    'invalidAmount': 'Ungültiger Betrag',
    'amountExceedsAvailable': 'Betrag übersteigt verfügbaren Wert',
    'errorRedeemingVoucher': 'Fehler beim Einlösen des Gutscheins',
    'useCommaOrDot': 'Komma oder Punkt als Dezimaltrenner verwenden',
    
    // Gutschein-Informationen
    'totalValue': 'Gesamtwert',
    'availableValue': 'Noch verfügbar',
    'voucher': 'Gutschein',
    'voucherRedeemed': 'Der Gutschein wurde vollständig eingelöst',
    'voucherIsValid': 'Der Gutschein ist gültig',
    'voucherAlreadyRedeemed': 'Der Gutschein wurde bereits eingelöst',
    'partiallyRedeemed': '{{amount}} des Gutscheins wurden eingelöst',
    'validUntil': 'Gültig bis',
    'voucherCode': 'Gutschein-Code',
    'voucherInformation': 'Gutschein-Informationen',
    'fragmentable': 'Teilbar',
    'fragmentableDescription': 'Dieser Gutschein kann teilweise eingelöst werden',
    'isAppointment': 'Termin-Gutschein',
    'appointmentDescription': 'Dieser Gutschein ist für einen Termin gültig',
    
    // Aktionen
    'redeemFull': 'Gutschein vollständig einlösen',
    'redeemPart': 'Gutschein-Teil einlösen',
    'scanVoucher': 'Gutschein scannen',
    'scanAnotherVoucher': 'Weiteren Gutschein scannen',
    'goToHomepage': 'Zur Startseite',
    'howMuchRedeem': 'Wie viel möchten Sie einlösen? Geben Sie einen Betrag in € ein!',
    'redeemAmount': 'Einlösewert',
    
    // Home Seite
    'appTitle': 'GUTSCHEIN- UND TICKETSCANNER',
    'appDescription': 'Schnell und einfach Gutscheine einlösen, prüfen und aufladen sowie Tickets prüfen & entwerten.',
    'scanQrCode': 'QR-Code scannen',
    'reloadVoucher': 'Gutschein aufladen',
    'logout': 'Logout',
    
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
    'loading': 'Loading',
    'voucherDetails': 'Voucher Details',
    'partialRedemption': 'Partial Redemption',
    'redemptionSuccess': 'Redemption Successful',
    'errorFetchingVoucher': 'Error fetching voucher',
    'voucherNotFound': 'Voucher not found',
    'invalidAmount': 'Invalid amount',
    'amountExceedsAvailable': 'Amount exceeds available value',
    'errorRedeemingVoucher': 'Error redeeming voucher',
    'useCommaOrDot': 'Use comma or dot as decimal separator',
    
    // Voucher Information
    'totalValue': 'Total Value',
    'availableValue': 'Still Available',
    'voucher': 'Voucher',
    'voucherRedeemed': 'The voucher has been fully redeemed',
    'voucherIsValid': 'The voucher is valid',
    'voucherAlreadyRedeemed': 'The voucher has already been redeemed',
    'partiallyRedeemed': '{{amount}} of the voucher has been redeemed',
    'validUntil': 'Valid until',
    'voucherCode': 'Voucher Code',
    'voucherInformation': 'Voucher Information',
    'fragmentable': 'Fragmentable',
    'fragmentableDescription': 'This voucher can be partially redeemed',
    'isAppointment': 'Appointment Voucher',
    'appointmentDescription': 'This voucher is valid for an appointment',
    
    // Actions
    'redeemFull': 'Redeem voucher fully',
    'redeemPart': 'Redeem part of voucher',
    'scanVoucher': 'Scan voucher',
    'scanAnotherVoucher': 'Scan another voucher',
    'goToHomepage': 'Go to homepage',
    'howMuchRedeem': 'How much would you like to redeem? Enter an amount in €!',
    'redeemAmount': 'Redemption value',
    
    // Home Page
    'appTitle': 'VOUCHER AND TICKET SCANNER',
    'appDescription': 'Quickly and easily redeem, check and reload vouchers as well as check & validate tickets.',
    'scanQrCode': 'Scan QR Code',
    'reloadVoucher': 'Reload Voucher',
    'logout': 'Logout',
    
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
