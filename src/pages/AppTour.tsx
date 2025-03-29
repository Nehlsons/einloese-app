
import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, QrCode, Gift, Check, CreditCard, Play, Film } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Define the tour steps
const tourSteps = [
  {
    title: {
      en: "Welcome to Voucher Scanner App",
      de: "Willkommen in der Gutschein-Scanner-App"
    },
    description: {
      en: "This app helps you manage vouchers and tickets - scan, redeem, and reload with ease.",
      de: "Diese App hilft Ihnen bei der Verwaltung von Gutscheinen und Tickets - scannen, einlösen und aufladen leicht gemacht."
    },
    icon: Film,
    image: "/placeholder.svg"
  },
  {
    title: {
      en: "Scan Vouchers",
      de: "Gutscheine scannen"
    },
    description: {
      en: "Use the QR code scanner to quickly scan vouchers and display their details.",
      de: "Verwenden Sie den QR-Code-Scanner, um Gutscheine schnell zu scannen und deren Details anzuzeigen."
    },
    icon: QrCode,
    image: "/placeholder.svg"
  },
  {
    title: {
      en: "View Voucher Details",
      de: "Gutscheindetails anzeigen"
    },
    description: {
      en: "See all information about a voucher, including value, validity, and special properties.",
      de: "Sehen Sie alle Informationen zu einem Gutschein, einschließlich Wert, Gültigkeit und besondere Eigenschaften."
    },
    icon: CreditCard,
    image: "/placeholder.svg"
  },
  {
    title: {
      en: "Redeem Vouchers",
      de: "Gutscheine einlösen"
    },
    description: {
      en: "Redeem vouchers in full or partially, depending on the voucher's properties.",
      de: "Lösen Sie Gutscheine vollständig oder teilweise ein, je nach Eigenschaften des Gutscheins."
    },
    icon: Gift,
    image: "/placeholder.svg"
  },
  {
    title: {
      en: "Successful Redemption",
      de: "Erfolgreiche Einlösung"
    },
    description: {
      en: "After redemption, view the success page with updated voucher balance.",
      de: "Nach der Einlösung sehen Sie die Erfolgsseite mit aktualisiertem Guthabenguthaben."
    },
    icon: Check,
    image: "/placeholder.svg"
  },
  {
    title: {
      en: "Reload Vouchers",
      de: "Gutscheine aufladen"
    },
    description: {
      en: "Add value to existing vouchers using the reload feature.",
      de: "Fügen Sie bestehenden Gutscheinen mit der Aufladefunktion Wert hinzu."
    },
    icon: CreditCard,
    image: "/placeholder.svg"
  }
];

export default function AppTour() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = tourSteps.length;
  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Auto-play functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setIsCompleted(true);
        }
      }, 5000); // 5 seconds per step
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps]);

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            className="p-2" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">
            {language === 'de' ? 'App-Tour' : 'App Tour'}
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Tour content */}
        <Card className="bg-white shadow-lg rounded-xl mb-6 overflow-hidden">
          <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
            {currentTourStep.icon && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                <currentTourStep.icon size={24} />
              </div>
            )}
            <div className="flex items-center justify-center h-full">
              <img 
                src={currentTourStep.image} 
                alt={currentTourStep.title[language === 'de' ? 'de' : 'en']} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">
              {currentTourStep.title[language === 'de' ? 'de' : 'en']}
            </h2>
            <p className="text-gray-700 mb-4">
              {currentTourStep.description[language === 'de' ? 'de' : 'en']}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {language === 'de' 
                ? `Schritt ${currentStep + 1} von ${totalSteps}` 
                : `Step ${currentStep + 1} of ${totalSteps}`}
            </p>
          </div>
        </Card>

        {/* Tour controls */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={goToPrevStep} 
            disabled={currentStep === 0}
          >
            <ArrowLeft size={20} className="mr-2" />
            {language === 'de' ? 'Zurück' : 'Previous'}
          </Button>
          
          <Button 
            variant={isPlaying ? "destructive" : "default"}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={togglePlayPause}
          >
            <Play size={20} className="mr-2" />
            {isPlaying 
              ? (language === 'de' ? 'Pause' : 'Pause') 
              : (language === 'de' ? 'Abspielen' : 'Play')}
          </Button>
          
          <Button 
            variant="outline"
            onClick={goToNextStep}
            disabled={currentStep === totalSteps - 1 && isCompleted}
          >
            {language === 'de' ? 'Weiter' : 'Next'}
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>

        {/* Complete tour buttons */}
        <div className="flex flex-col gap-3">
          {isCompleted && (
            <Button 
              onClick={restartTour}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
            >
              <Film size={20} className="mr-2" />
              {language === 'de' ? 'Tour neu starten' : 'Restart Tour'}
            </Button>
          )}
          
          <Link to="/">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
            >
              {language === 'de' ? 'Zur Startseite' : 'Go to Homepage'}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
