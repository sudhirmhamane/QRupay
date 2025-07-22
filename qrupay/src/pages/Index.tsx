import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* Medication Reminders CTA */}
        <section className="max-w-2xl mx-auto my-12 p-6 bg-medical-primary/10 rounded-lg shadow flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-medical-primary flex items-center gap-2">💊 Medication Reminders</h2>
          <p className="mb-4 text-center text-medical-dark">Never miss a dose! Track, update, and manage your medications easily.</p>
          <Button size="lg" variant="medical" onClick={() => navigate('/medications')}>
            Go to Medication Reminders
          </Button>
        </section>
        <CTA />
      </main>
    </div>
  );
};

export default Index;
