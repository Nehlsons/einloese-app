
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Share, Copy, CheckCircle, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TeamSharing() {
  const { language } = useLanguage();
  const [emails, setEmails] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>(window.location.origin);
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    if (!emails.trim()) {
      toast({
        title: language === 'de' ? "Fehler" : "Error",
        description: language === 'de' 
          ? "Bitte geben Sie mindestens eine E-Mail-Adresse ein" 
          : "Please enter at least one email address",
        variant: "destructive",
      });
      return;
    }

    // This would typically connect to a backend service to send emails
    // For now, we'll just show a success message
    toast({
      title: language === 'de' ? "Erfolg" : "Success",
      description: language === 'de'
        ? "Status wurde mit dem Team geteilt"
        : "Status has been shared with your team",
    });
    setEmails("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: language === 'de' ? "Kopiert!" : "Copied!",
      description: language === 'de'
        ? "Link wurde in die Zwischenablage kopiert"
        : "Link has been copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold">
                {language === 'de' ? 'Status mit Team teilen' : 'Share Status with Team'}
              </h1>
            </div>
            
            <p className="text-gray-600 mb-6">
              {language === 'de' 
                ? 'Teilen Sie den aktuellen Status der Gutscheine und Tickets mit Ihrem Team.'
                : 'Share the current status of vouchers and tickets with your team members.'}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'de' ? 'Team-Mitglieder E-Mails' : 'Team Member Emails'}
              </label>
              <Input
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder={language === 'de' 
                  ? "E-Mail-Adressen (durch Kommas getrennt)" 
                  : "Email addresses (comma separated)"}
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                {language === 'de'
                  ? "Mehrere E-Mails durch Kommas trennen"
                  : "Separate multiple emails with commas"}
              </p>
            </div>

            <Button 
              onClick={handleShare}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center gap-2 mb-4"
            >
              <Share size={20} />
              {language === 'de' ? 'Per E-Mail teilen' : 'Share via Email'}
            </Button>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'de' ? 'Oder Link teilen' : 'Or Share Link'}
              </label>
              <div className="flex">
                <Input
                  value={shareUrl}
                  readOnly
                  className="rounded-r-none"
                />
                <Button
                  onClick={copyToClipboard}
                  className="rounded-l-none bg-blue-500 hover:bg-blue-600"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button 
                onClick={() => window.history.back()}
                variant="outline" 
                className="w-full border-gray-300 py-3 text-gray-700 hover:bg-gray-100"
              >
                {language === 'de' ? 'Zurück' : 'Back'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
