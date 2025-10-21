import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Utensils,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  CheckCircle2,
  Zap,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  ChefHat,
  Bell,
  Settings,
} from "lucide-react";

const MarketingLanding = () => {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "NFC-Powered Ordering",
      description: "Customers tap their phones to access your menu instantly. No app downloads, no QR codes.",
      color: "text-blue-500",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Digital Menu Management",
      description: "Update prices, dishes, and availability in real-time from any device.",
      color: "text-green-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Faster Service",
      description: "Reduce wait times by 40%. Orders go directly to the kitchen the moment they're confirmed.",
      color: "text-orange-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Increase Revenue",
      description: "Boost table turnover and upsell opportunities with engaging digital menus.",
      color: "text-purple-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Better Customer Experience",
      description: "Multi-language support, dietary filters, and detailed dish information at their fingertips.",
      color: "text-pink-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Track popular dishes, peak hours, and customer preferences to optimize your menu.",
      color: "text-indigo-500",
    },
  ];

  const benefits = [
    "No hardware installation required",
    "Set up in under 30 minutes",
    "Works with any smartphone",
    "24/7 customer support",
    "Free menu updates anytime",
    "Multi-location support",
    "Real-time kitchen notifications",
    "Staff training included",
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Customer Taps NFC Tag",
      description: "Each table has a small NFC tag. Customers simply tap their phone to access the menu.",
      icon: <Smartphone className="w-12 h-12" />,
    },
    {
      step: "2",
      title: "Browse & Order",
      description: "Beautiful digital menu with photos, dietary info, and customization options.",
      icon: <Utensils className="w-12 h-12" />,
    },
    {
      step: "3",
      title: "Waiter Confirms",
      description: "Staff reviews the order, makes adjustments, and sends it to the kitchen.",
      icon: <Users className="w-12 h-12" />,
    },
    {
      step: "4",
      title: "Kitchen Prepares",
      description: "Orders appear on kitchen display with real-time status updates.",
      icon: <ChefHat className="w-12 h-12" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="text-lg px-4 py-2" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Next-Generation Restaurant Technology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
              Transform Your Restaurant with NFC Table Ordering
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The complete contactless dining solution that increases revenue, reduces wait times, and
              delights your customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/setup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/menu">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "40%", label: "Faster Service" },
              { value: "25%", label: "Revenue Increase" },
              { value: "99%", label: "Customer Satisfaction" },
              { value: "30min", label: "Setup Time" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete platform designed specifically for modern restaurants
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple for customers, powerful for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="relative">
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <div className="text-5xl font-bold text-primary/20 absolute top-4 right-4">
                      {item.step}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{item.description}</p>
                  </CardContent>
                </Card>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Why Restaurants Love Us</CardTitle>
                <CardDescription className="text-lg">
                  Everything you need, nothing you don't
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-orange-500/10 to-red-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Fully Customizable</h2>
              <p className="text-xl text-muted-foreground">
                Make it yours with extensive customization options
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Settings className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Brand Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Custom colors & logos</li>
                    <li>• Personalized themes</li>
                    <li>• Your restaurant's style</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Smart Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Order ready alerts</li>
                    <li>• Kitchen updates</li>
                    <li>• Staff notifications</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Data & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Secure payments</li>
                    <li>• Customer privacy</li>
                    <li>• Compliance ready</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-orange-600 to-red-600 border-0 text-white">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Restaurant?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join hundreds of restaurants already using our platform. Get started in minutes, not days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                  <Link to="/setup">
                    Start Free Setup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  asChild
                >
                  <Link to="/">Explore Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MarketingLanding;
