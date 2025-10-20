import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", path: "/marketing" },
      { name: "Demo Menu", path: "/menu" },
      { name: "Setup Guide", path: "/setup" },
      { name: "Pricing", path: "/marketing" },
    ],
    dashboards: [
      { name: "Customer Menu", path: "/menu" },
      { name: "Waiter Dashboard", path: "/waiter" },
      { name: "Kitchen Display", path: "/kitchen" },
      { name: "Admin Portal", path: "/admin" },
    ],
    company: [
      { name: "About Us", path: "/" },
      { name: "Contact", path: "/" },
      { name: "Privacy Policy", path: "/" },
      { name: "Terms of Service", path: "/" },
    ],
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">NFC Table Ordering System</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Transform your restaurant with contactless NFC ordering. Faster service, happier
              customers, increased revenue.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@nfcordering.com" className="hover:text-primary transition-colors">
                  info@nfcordering.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Tech Street, San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors story-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards Links */}
          <div>
            <h4 className="font-semibold mb-4">Dashboards</h4>
            <ul className="space-y-2">
              {footerLinks.dashboards.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors story-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors story-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} NFC Table Ordering System. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover-scale"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover-scale"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover-scale"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover-scale"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
