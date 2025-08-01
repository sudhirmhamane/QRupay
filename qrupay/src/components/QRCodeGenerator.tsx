import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Printer, Share2, Copy } from 'lucide-react';
import QRCode from 'qrcode';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  profileId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  className?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  profileId,
  emergencyContactName,
  emergencyContactPhone,
  className = ''
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    generateQRCode();
  }, [profileId]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const emergencyUrl = `${window.location.origin}/emergency/${profileId}`;
      const qrDataUrl = await QRCode.toDataURL(emergencyUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#dc2626',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate QR code',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrupay-qr.png';
    link.href = qrCodeDataUrl;
    link.click();
    
    toast({
      title: 'Downloaded!',
      description: 'QR code saved to downloads'
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title><span className="text-primary">QR</span>upay - Emergency QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { margin: 20px auto; }
              .emergency-info { margin-top: 20px; font-size: 14px; }
              .contact-info { background: #f5f5f5; padding: 15px; margin: 20px; border-radius: 8px; }
              .instructions { border: 2px solid #dc2626; padding: 15px; margin: 20px; border-radius: 8px; background: #fee2e2; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <h1>🚨 <span className="text-primary">QR</span>upay Emergency QR Code</h1>
            <div class="qr-container">
              <img src="${qrCodeDataUrl}" alt="Emergency QR Code" style="width: 200px; height: 200px;" />
            </div>
            <div class="instructions">
              <h3>FOR EMERGENCY RESPONDERS:</h3>
              <p>Scan this QR code with any smartphone camera to access critical medical information</p>
            </div>
            <div class="emergency-info">
              <div class="contact-info">
                <h3>Emergency Contact</h3>
                <p><strong>${emergencyContactName}</strong></p>
                <p><strong>${emergencyContactPhone}</strong></p>
              </div>
              <p><em>Generated by QRUPAY - Emergency Medical Information System</em></p>
              <p><small>Keep this QR code in your wallet, on your phone, or visible in emergency situations</small></p>
            </div>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    
    toast({
      title: 'Printing...',
      description: 'QR code sent to printer'
    });
  };

  const handleShare = async () => {
    try {
      const emergencyUrl = `${window.location.origin}/emergency/${profileId}`;
      await navigator.share({
        title: 'My Emergency Medical QR Code',
        text: 'Access my emergency medical information in case of emergency',
        url: emergencyUrl
      });
      toast({
        title: 'Shared successfully!',
        description: 'Emergency profile link shared.'
      });
    } catch (error) {
      // Fallback to copying to clipboard
      const emergencyUrl = `${window.location.origin}/emergency/${profileId}`;
      navigator.clipboard.writeText(emergencyUrl);
      toast({
        title: 'Link copied!',
        description: 'Emergency profile link copied to clipboard.'
      });
    }
  };

  const handleCopyLink = async () => {
    const emergencyUrl = `${window.location.origin}/emergency/${profileId}`;
    await navigator.clipboard.writeText(emergencyUrl);
    toast({
      title: 'Link copied!',
      description: 'Emergency profile link copied to clipboard.'
    });
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Emergency QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Generating QR code...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Emergency QR Code
          <Badge variant="destructive" className="ml-auto">EMERGENCY</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {qrCodeDataUrl ? (
          <>
            <div className="p-4 bg-white rounded-lg border-2 border-medical-primary inline-block">
              <img 
                src={qrCodeDataUrl} 
                alt="Emergency QR Code" 
                className="w-48 h-48 mx-auto"
              />
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Share this QR code for emergency access</p>
              <p>Emergency responders can scan this to access your medical information</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Download
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Printer className="w-3 h-3" />
                Print
              </Button>
              <Button
                onClick={handleShare}
                variant="medical"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                Share
              </Button>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy Link
              </Button>
            </div>

            <div className="bg-medical-light p-3 rounded-lg text-xs text-medical-dark">
              <p className="font-medium">💡 Tips for using your QR code:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• Keep it in your wallet or phone case</li>
                <li>• Print multiple copies for family members</li>
                <li>• Place one in your car's glove compartment</li>
                <li>• Works even when your phone is locked</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="py-8">
            <p className="text-muted-foreground">
              Failed to generate QR code. Please try refreshing the page.
            </p>
            <Button onClick={generateQRCode} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};