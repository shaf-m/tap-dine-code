import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Smartphone,
  Users,
  ChefHat,
  Settings,
  Utensils,
  PlayCircle,
  FileText,
  Zap,
  Shield,
  HelpCircle,
  Download,
  Video,
} from "lucide-react";

const SetupGuide = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const setupSteps = [
    {
      id: 1,
      title: "Create Your Account & Restaurant Profile",
      time: "5 minutes",
      icon: <Settings className="w-6 h-6" />,
      description: "Set up your restaurant's basic information",
      tasks: [
        "Sign up for a free account",
        "Enter restaurant name and location",
        "Upload your restaurant logo",
        "Set operating hours and contact information",
      ],
    },
    {
      id: 2,
      title: "Build Your Digital Menu",
      time: "15 minutes",
      icon: <Utensils className="w-6 h-6" />,
      description: "Add dishes, prices, and descriptions",
      tasks: [
        "Navigate to the Admin Portal",
        "Add menu categories (Appetizers, Mains, etc.)",
        "Upload high-quality dish photos",
        "Write compelling dish descriptions",
        "Set prices and dietary information",
        "Mark allergens and spice levels",
      ],
    },
    {
      id: 3,
      title: "Configure NFC Tags",
      time: "10 minutes",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Set up contactless ordering at tables",
      tasks: [
        "Receive your NFC tags (included in starter kit)",
        "Assign each tag to a specific table number",
        "Test tap-to-order functionality",
        "Place tags on tables in visible locations",
      ],
    },
    {
      id: 4,
      title: "Train Your Staff",
      time: "20 minutes",
      icon: <Users className="w-6 h-6" />,
      description: "Get your team up to speed",
      tasks: [
        "Show waiters how to access the Waiter Dashboard",
        "Train kitchen staff on the Kitchen Display",
        "Practice order confirmation workflow",
        "Review special requests and modifications",
        "Test end-to-end order flow",
      ],
    },
    {
      id: 5,
      title: "Go Live!",
      time: "5 minutes",
      icon: <Zap className="w-6 h-6" />,
      description: "Launch your new ordering system",
      tasks: [
        "Do a final test order",
        "Inform customers about the new system",
        "Monitor first few orders closely",
        "Collect feedback from staff and customers",
      ],
    },
  ];

  const staffRoles = [
    {
      role: "Waiters",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      responsibilities: [
        "Review customer orders via order codes",
        "Confirm and modify orders as needed",
        "Send confirmed orders to kitchen",
        "Deliver food when orders are marked ready",
      ],
      dashboardLink: "/waiter",
    },
    {
      role: "Kitchen Staff",
      icon: <ChefHat className="w-8 h-8 text-orange-500" />,
      responsibilities: [
        "View incoming orders in real-time",
        "Mark orders as 'preparing' when started",
        "Mark orders as 'ready' when complete",
        "Track order timing and priorities",
      ],
      dashboardLink: "/kitchen",
    },
    {
      role: "Admin/Manager",
      icon: <Settings className="w-8 h-8 text-purple-500" />,
      responsibilities: [
        "Manage menu items and pricing",
        "Update dish availability",
        "Monitor overall operations",
        "Access analytics and reports",
      ],
      dashboardLink: "/admin",
    },
  ];

  const trainingResources = [
    {
      title: "Quick Start Video",
      description: "5-minute overview of the entire system",
      icon: <Video className="w-6 h-6" />,
      type: "video",
    },
    {
      title: "Staff Training Guide",
      description: "Printable PDF for your team",
      icon: <FileText className="w-6 h-6" />,
      type: "pdf",
    },
    {
      title: "Customer Instructions",
      description: "Table cards explaining how to order",
      icon: <Download className="w-6 h-6" />,
      type: "pdf",
    },
    {
      title: "Troubleshooting Guide",
      description: "Common issues and solutions",
      icon: <HelpCircle className="w-6 h-6" />,
      type: "pdf",
    },
  ];

  const bestPractices = [
    {
      title: "Menu Photography",
      tips: [
        "Use natural lighting when possible",
        "Keep backgrounds simple and clean",
        "Show portion sizes accurately",
        "Include garnish and presentation",
      ],
    },
    {
      title: "Dish Descriptions",
      tips: [
        "Highlight signature ingredients",
        "Mention cooking methods",
        "Include flavor profiles (spicy, sweet, etc.)",
        "Keep descriptions concise (2-3 sentences)",
      ],
    },
    {
      title: "Customer Communication",
      tips: [
        "Place table cards explaining the NFC ordering",
        "Train staff to assist first-time users",
        "Highlight dietary filters and customization",
        "Promote the speed and convenience",
      ],
    },
  ];

  const progress = Math.round((completedSteps.length / setupSteps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-lg p-8 text-white">
          <Badge variant="secondary" className="mb-4">
            Setup Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Welcome to Your New Restaurant System!</h1>
          <p className="text-xl text-white/90 mb-6">
            Follow this step-by-step guide to get up and running in under 30 minutes
          </p>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Setup Progress</span>
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup Steps</TabsTrigger>
            <TabsTrigger value="training">Staff Training</TabsTrigger>
            <TabsTrigger value="tips">Best Practices</TabsTrigger>
          </TabsList>

          {/* Setup Steps Tab */}
          <TabsContent value="setup" className="space-y-4 mt-6">
            {setupSteps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              return (
                <Card
                  key={step.id}
                  className={`transition-all ${
                    isCompleted ? "border-success bg-success/5" : "border-border"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <button
                          onClick={() => toggleStep(step.id)}
                          className="mt-1 transition-transform hover:scale-110"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-8 h-8 text-success" />
                          ) : (
                            <Circle className="w-8 h-8 text-muted-foreground" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-primary">{step.icon}</div>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <Badge variant="outline">{step.time}</Badge>
                          </div>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 ml-12">
                      {step.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}

            {progress === 100 && (
              <Card className="border-2 border-success bg-success/5">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Setup Complete! 🎉</h3>
                  <p className="text-muted-foreground mb-6">
                    Your restaurant is ready to start accepting orders
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/admin">
                      Go to Admin Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Training Resources</CardTitle>
                <CardDescription>
                  Everything you need to train your team effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {trainingResources.map((resource, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="text-primary">{resource.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Staff Roles & Responsibilities</h3>
              {staffRoles.map((role, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {role.icon}
                        <CardTitle className="text-xl">{role.role}</CardTitle>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={role.dashboardLink}>
                          View Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.responsibilities.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="tips" className="space-y-6 mt-6">
            <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-2" />
                <CardTitle className="text-2xl">Pro Tips for Success</CardTitle>
                <CardDescription>
                  Learn from restaurants that have successfully implemented our system
                </CardDescription>
              </CardHeader>
            </Card>

            {bestPractices.map((practice, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {practice.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{tipIdx + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card className="border-2 border-primary">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is available 24/7 to assist you
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline">Live Chat Support</Button>
                  <Button variant="outline">Email Support</Button>
                  <Button variant="outline">Call Us</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Links Footer */}
        <Card className="bg-muted">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/menu">View Demo Menu</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/admin">Admin Portal</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/marketing">Marketing Page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SetupGuide;
