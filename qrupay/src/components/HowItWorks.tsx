import { UserPlus, FileText, QrCode, Scan } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up securely and create your personal medical profile with encrypted data storage.",
    step: "01"
  },
  {
    icon: FileText,
    title: "Add Medical Info",
    description: "Input your critical medical information: blood type, allergies, conditions, and emergency contacts.",
    step: "02"
  },
  {
    icon: QrCode,
    title: "Generate QR Code",
    description: "Get your unique QR code that links to your emergency medical information. Print or save it.",
    step: "03"
  },
  {
    icon: Scan,
    title: "Emergency Access",
    description: "First responders scan your QR code for instant access to your vital medical information.",
    step: "04"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-accent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            How <span className="text-primary">QR</span>upay Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, secure, and life-saving. Set up your emergency medical profile in minutes 
            and ensure your information is accessible when it matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-px bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
