import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();
  
  const handleCreateProfile = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-16 h-16" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Protect Your Health?
          </h2>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          "Scan. Save. Survive."
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join QRUPAY to keep emergency medical information 
            accessible and secure. Start creating your life-saving QR profile today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleCreateProfile}
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
          >
            Create Your Profile
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleLearnMore}
            className="text-lg px-8 py-6 border-white text-red-500 hover:bg-white hover:text-primary"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-8 text-sm opacity-75">
          ✓ Free to start ✓ HIPAA compliant ✓ No credit card required
        </div>
      </div>
    </section>
  );
};
