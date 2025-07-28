import { Github, Mail, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-muted py-12 px-4">
      <div className="container mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Heart className="w-5 h-5 text-primary" />
            QRupay
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-md">
            Built for emergencies. <br className="hidden sm:block" />
            Instant access to medical information when every second counts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-6">
          <div className="flex gap-4">
            <a
              href="mailto:sudhirmhamane908@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a
              href="https://github.com/sudhirmhamane"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a
              href="https://linkedin.com/in/sudhirmhamane"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>

          <Button
            variant="outline"
            className="text-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} QRupay. Built by Sudhir Mhamane.
      </div>
    </footer>
  );
};
