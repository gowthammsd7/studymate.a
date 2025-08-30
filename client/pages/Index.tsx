import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import {
  Brain,
  Upload,
  HelpCircle,
  BookOpen,
  BarChart3,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const features = [
    {
      icon: Brain,
      title: "AI Advisor",
      description: "Get personalized study recommendations powered by advanced AI",
      href: "/ai-advisor",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Upload,
      title: "Upload Materials",
      description: "Upload your notes, PDFs, and documents for AI analysis",
      href: "/upload",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: HelpCircle,
      title: "Study Assistance",
      description: "Get instant help with homework and complex topics",
      href: "/assistance",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: BookOpen,
      title: "Smart Flashcards",
      description: "AI-generated flashcards from your study materials",
      href: "/flashcards",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: BarChart3,
      title: "Progress Dashboard",
      description: "Track your learning progress with detailed analytics",
      href: "/dashboard",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Collaborate with peers in AI-enhanced study sessions",
      href: "/study-groups",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const benefits = [
    "Personalized AI-driven learning paths",
    "Instant homework help and explanations",
    "Smart flashcard generation from any content",
    "Progress tracking and performance insights",
    "Collaborative study features",
    "24/7 AI study companion"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Study Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Study Smarter with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your learning experience with personalized AI recommendations, 
              instant homework help, and intelligent study tools designed to maximize your academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                  {isAuthenticated ? "Go to Dashboard" : "Start Learning"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/ai-advisor">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Try AI Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Study Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your studies, powered by cutting-edge artificial intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.href} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose StudyAI?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered platform adapts to your learning style and helps you achieve 
                better results in less time.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Studies?</h3>
                  <p className="text-blue-100 mb-6">
                    Join thousands of students who are already studying smarter with AI
                  </p>
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">StudyAI</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering students with AI-driven learning solutions
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/ai-advisor" className="hover:text-white transition-colors">AI Advisor</Link>
            <Link to="/upload" className="hover:text-white transition-colors">Upload</Link>
            <Link to="/assistance" className="hover:text-white transition-colors">Assistance</Link>
            <Link to="/flashcards" className="hover:text-white transition-colors">Flashcards</Link>
            <Link to="/study-groups" className="hover:text-white transition-colors">Study Groups</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
            © 2024 StudyAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
