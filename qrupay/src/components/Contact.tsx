import { Mail, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const formspreeKey = import.meta.env.VITE_FORMSPREE_API_KEY;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(formspreeKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Message sent!" });
        setFormData({ name:"", email: "", message: "" });
      } else {
        toast({ title: "Error", description: "Failed to send.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section id="contact" className="relative py-20 px-4 bg-muted overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Let’s Connect</h2>
          <p className="text-muted-foreground mt-2">
            Have a question or want to collaborate? Drop a message!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Name
             </Label>
            <div className="relative">

              
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
            
          

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm">
              Message
            </Label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Enter Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pt-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};
