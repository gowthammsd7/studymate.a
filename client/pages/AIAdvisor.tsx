import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import {
  ArrowLeft,
  Brain,
  Target,
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Zap,
  Award,
  Users,
  FileText,
} from "lucide-react";

export default function AIAdvisor() {
  const { user, logout } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("mathematics");

  const studyData = {
    mathematics: {
      progress: 85,
      weakAreas: ["Derivatives", "Integration"],
      strongAreas: ["Algebra", "Trigonometry"],
      recommendedTime: "2.5 hours/week",
      nextGoal: "Master Calculus Chapter 5",
    },
    physics: {
      progress: 72,
      weakAreas: ["Quantum Mechanics", "Thermodynamics"],
      strongAreas: ["Mechanics", "Optics"],
      recommendedTime: "3 hours/week",
      nextGoal: "Complete Physics Lab Reports",
    },
    chemistry: {
      progress: 68,
      weakAreas: ["Organic Chemistry", "Bonding"],
      strongAreas: ["Periodic Table", "Reactions"],
      recommendedTime: "2 hours/week",
      nextGoal: "Memorize Organic Compounds",
    },
    history: {
      progress: 91,
      weakAreas: ["World War Era"],
      strongAreas: ["Ancient Civilizations", "Modern History"],
      recommendedTime: "1.5 hours/week",
      nextGoal: "Finish History Essay",
    },
  };

  const personalizedRecommendations = [
    {
      priority: "high",
      subject: "Mathematics",
      title: "Focus on Derivatives Practice",
      description:
        "Your recent test shows weakness in derivative applications. I recommend 30 minutes daily practice.",
      action: "Start Practice",
      icon: Target,
      timeEstimate: "30 min/day",
    },
    {
      priority: "medium",
      subject: "Physics",
      title: "Review Thermodynamics Concepts",
      description:
        "Based on your study pattern, thermodynamics needs reinforcement before the upcoming exam.",
      action: "Review Notes",
      icon: BookOpen,
      timeEstimate: "45 min",
    },
    {
      priority: "low",
      subject: "Chemistry",
      title: "Organic Chemistry Flashcards",
      description:
        "Create flashcards for organic compound names to improve retention.",
      action: "Create Cards",
      icon: FileText,
      timeEstimate: "20 min",
    },
  ];

  const studyInsights = [
    {
      icon: TrendingUp,
      title: "Peak Performance Time",
      value: "2:00 PM - 4:00 PM",
      description: "Your best study hours based on completion rates",
    },
    {
      icon: Clock,
      title: "Optimal Session Length",
      value: "45 minutes",
      description: "Sessions longer than this show decreased retention",
    },
    {
      icon: Star,
      title: "Learning Style",
      value: "Visual + Practice",
      description: "You learn best with diagrams and hands-on practice",
    },
    {
      icon: Target,
      title: "Success Prediction",
      value: "89% likely",
      description: "To achieve your semester goals at current pace",
    },
  ];

  const weeklyGoals = [
    {
      task: "Complete 5 calculus practice problems daily",
      completed: 4,
      total: 7,
      subject: "Math",
    },
    {
      task: "Review physics lab procedures",
      completed: 2,
      total: 3,
      subject: "Physics",
    },
    {
      task: "Memorize 20 chemistry formulas",
      completed: 15,
      total: 20,
      subject: "Chemistry",
    },
    {
      task: "Read 2 history chapters",
      completed: 2,
      total: 2,
      subject: "History",
    },
  ];

  const aiSuggestions = [
    "Take a 10-minute break every 45 minutes of study",
    "Review mathematics concepts before 3 PM for better retention",
    "Use the Pomodoro Technique for chemistry memorization",
    "Create mind maps for physics problem-solving",
    "Practice explaining concepts out loud to improve understanding",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyAI
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Study Advisor
              </h1>
              <p className="text-gray-600">
                Personalized recommendations powered by AI
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            {/* Priority Recommendations */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Priority Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered suggestions based on your study patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 hover:bg-white/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-2 rounded-lg ${
                              rec.priority === "high"
                                ? "bg-red-100"
                                : rec.priority === "medium"
                                  ? "bg-yellow-100"
                                  : "bg-green-100"
                            }`}
                          >
                            <rec.icon
                              className={`w-5 h-5 ${
                                rec.priority === "high"
                                  ? "text-red-500"
                                  : rec.priority === "medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {rec.title}
                              </h3>
                              <Badge
                                variant={
                                  rec.priority === "high"
                                    ? "destructive"
                                    : rec.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {rec.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>📚 {rec.subject}</span>
                              <span>⏱️ {rec.timeEstimate}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="ml-4">
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Tips */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  AI Study Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-blue-100">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Performance */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(studyData).map(([subject, data]) => (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="capitalize font-medium">
                            {subject}
                          </span>
                          <span className="text-sm text-gray-600">
                            {data.progress}%
                          </span>
                        </div>
                        <Progress value={data.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Next: {data.nextGoal}</span>
                          <span>{data.recommendedTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Study Insights */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Study Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <insight.icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {insight.title}
                            </h4>
                            <span className="text-sm font-semibold text-blue-600">
                              {insight.value}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-500" />
                  Weekly Goals Progress
                </CardTitle>
                <CardDescription>
                  Track your progress towards weekly study objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {goal.task}
                        </h4>
                        <Badge
                          variant={
                            goal.completed === goal.total
                              ? "default"
                              : "secondary"
                          }
                        >
                          {goal.subject}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress
                          value={(goal.completed / goal.total) * 100}
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-gray-600">
                          {goal.completed}/{goal.total}
                        </span>
                        {goal.completed === goal.total && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Study Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">
                      87%
                    </div>
                    <p className="text-sm text-gray-600">Higher than average</p>
                    <Progress value={87} className="mt-4 h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Focus Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      92%
                    </div>
                    <p className="text-sm text-gray-600">
                      Excellent concentration
                    </p>
                    <Progress value={92} className="mt-4 h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Knowledge Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">
                      84%
                    </div>
                    <p className="text-sm text-gray-600">
                      Good long-term memory
                    </p>
                    <Progress value={84} className="mt-4 h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Improvement Suggestions */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Improvement Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Consistency Challenge
                        </h4>
                        <p className="text-sm text-gray-600">
                          Your study sessions vary greatly in length. Try
                          maintaining 45-minute focused sessions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Collaboration Boost
                        </h4>
                        <p className="text-sm text-gray-600">
                          Consider joining study groups for chemistry - peer
                          learning could improve retention by 23%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
