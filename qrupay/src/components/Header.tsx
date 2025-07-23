import { Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Smart section navigation for landing page sections
  const handleSectionNav = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  // On landing page, scroll to section if scrollTo param is present
  React.useEffect(() => {
    if (location.pathname === "/") {
      const params = new URLSearchParams(location.search);
      const scrollTo = params.get("scrollTo");
      if (scrollTo) {
        setTimeout(() => {
          const el = document.getElementById(scrollTo);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // wait for DOM
      }
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-primary">QR</span>upay
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleSectionNav("features")}
              className="bg-transparent border-0 p-0 m-0 text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleSectionNav("how-it-works")}
              className="bg-transparent border-0 p-0 m-0 text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              How It Works
            </button>
            {user && (
              <Link
                to="/dashboard"
                className="text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {!user && (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button variant="medical" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleSectionNav("features")}
                className="bg-transparent border-0 p-0 m-0 text-foreground hover:text-primary transition-colors cursor-pointer text-left"
              >
                Features
              </button>
              <button
                onClick={() => handleSectionNav("how-it-works")}
                className="bg-transparent border-0 p-0 m-0 text-foreground hover:text-primary transition-colors cursor-pointer text-left"
              >
                How It Works
              </button>
              {user && (
                <Link
                  to="/dashboard"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </nav>
            {!user && (
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  variant="medical"
                  className="justify-start"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
