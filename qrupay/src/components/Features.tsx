import { QrCode, Shield, Clock, Users, Smartphone, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: QrCode,
    title: "Instant QR Access",
    description: "Generate a unique QR code that emergency responders can scan for immediate access to your critical medical information.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your medical data is encrypted and stored securely. Only emergency information is accessible through the QR code.",
    color: "text-success"
  },
  {
    icon: Clock,
    title: "Save Critical Time",
    description: "No passwords, no apps to download. First responders get instant access when every second counts.",
    color: "text-warning"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Works perfectly on any smartphone or tablet. Designed for emergency situations and high-stress environments.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Emergency Contacts",
    description: "Store multiple emergency contacts with phone numbers for immediate family notification.",
    color: "text-success"
  },
  {
    icon: AlertTriangle,
    title: "Critical Alerts",
    description: "Highlight life-threatening allergies and medical conditions that responders need to know immediately.",
    color: "text-destructive"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Features That <span className="text-primary">Save Lives</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            QRUPAY bridges the communication gap in emergency situations, ensuring your vital medical 
            information is always accessible when you need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
