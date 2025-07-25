import { Heart, Shield, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.png";

export const Hero = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleViewDemo = () => {
    // Navigate to a demo profile
    navigate('/emergency/demo');
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background to-accent overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Emergency Medical System
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary">QR</span>upay – Your Life,
                <br />
                <span className="text-foreground">One Scan Away</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Store critical medical information securely. Generate a QR code for instant emergency access. 
                When every second counts, <span className="text-primary">QR</span>upay ensures your medical data is always available.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary-hover"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleViewDemo}
                className="text-lg px-8 py-6"
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="w-5 h-5 text-primary" />
                Instant Access
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="MedLink Emergency Health QR System"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/40 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
