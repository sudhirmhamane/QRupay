import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {user && (
          <section className="max-w-2xl mx-auto my-16 px-8 py-8 bg-white/80 border border-medical-primary/20 rounded-2xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-medical-primary flex items-center gap-2">
              <span role="img" aria-label="Medication">
                💊
              </span>{" "}
              Medication Reminders
            </h2>
            <p className="mb-6 text-center text-medical-dark text-base md:text-lg">
              Never miss a dose! Track, update, and manage your medications
              easily.
            </p>
            <Button
              size="lg"
              variant="medical"
              className="px-8 py-3 rounded-full font-medium shadow-medical transition hover:scale-105"
              onClick={() => navigate("/medications")}
            >
              Go to Medication Reminders
            </Button>
          </section>
        )}
        <CTA />
      </main>
    </div>
  );
};

export default Index;
