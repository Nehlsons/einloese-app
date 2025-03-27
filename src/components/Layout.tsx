
import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/52b744be-0a24-4eba-b0b0-1a40099757b5.png" 
              alt="Gutschein Werft Logo" 
              className="h-8 mr-2" 
            />
            <div>
              <span className="text-blue-500 font-bold">GUTSCHEIN</span>
              <span className="text-gray-800 font-black ml-1">WERFT</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <div className="bg-blue-500 py-4 text-white text-center text-xs">
        <div className="container mx-auto px-4">
          <div className="space-y-1">
            <p>Kontakt/Hilfe</p>
            <p>Impressum</p>
            <p>Datenschutz</p>
          </div>
        </div>
      </div>
    </div>
  );
};
