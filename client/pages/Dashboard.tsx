import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Upload, 
  HelpCircle, 
  BookOpen, 
  Users, 
  Sparkles,
  Search,
  Bell,
  Settings,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Book,
  FileText,
  ArrowRight,
  Play,
  CheckCircle2,
  Star
} from "lucide-react";

export default function Dashboard() {
  const quickActions = [
    {
      icon: Brain,
      title: "AI Advisor",
      description: "Get personalized study recommendations",
      href: "/ai-advisor",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Upload,
      title: "Upload Materials",
      description: "Add new study documents",
      href: "/upload",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: BookOpen,
      title: "Flashcards",
      description: "Review your flashcard sets",
      href: "/flashcards",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join collaborative sessions",
      href: "/study-groups",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    }
  ];

  const recentActivity = [
    {
      action: "Completed flashcard set",
      subject: "Advanced Calculus",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      action: "Uploaded study materials",
      subject: "Physics Notes",
      time: "5 hours ago",
      icon: Upload,
      color: "text-blue-500"
    },
    {
      action: "Joined study group",
      subject: "Chemistry Study Group",
      time: "1 day ago",
      icon: Users,
      color: "text-purple-500"
    },
    {
      action: "AI recommendation",
      subject: "Math practice suggested",
      time: "2 days ago",
      icon: Brain,
      color: "text-cyan-500"
    }
  ];

  const studyStats = [
    { label: "Study Streak", value: "7 days", icon: Trophy, color: "text-yellow-500" },
    { label: "Hours This Week", value: "12.5h", icon: Clock, color: "text-blue-500" },
    { label: "Completed Sets", value: "24", icon: CheckCircle2, color: "text-green-500" },
    { label: "Success Rate", value: "87%", icon: Target, color: "text-purple-500" }
  ];

  const upcomingTasks = [
    { task: "Review Calculus Chapter 5", due: "Today", priority: "high" },
    { task: "Physics Problem Set #3", due: "Tomorrow", priority: "medium" },
    { task: "History Essay Draft", due: "In 3 days", priority: "low" },
    { task: "Chemistry Lab Report", due: "Next week", priority: "medium" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyAI
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your materials, notes, or topics..."
                  className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey? You're doing great!
          </p>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href} className="group">
                <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${action.bgColor} border-white/50`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Study Progress */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Study Progress
                </CardTitle>
                <CardDescription>Your learning journey this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Mathematics</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Physics</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Chemistry</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">History</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest study activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">{activity.subject}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" className="w-full">
                    View All Activity
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Study Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Study Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-sm text-gray-600">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.task}
                        </p>
                        <p className="text-xs text-gray-500">{task.due}</p>
                      </div>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" className="w-full">
                    View All Tasks
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Brain className="w-8 h-8 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">AI Recommendation</h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Based on your recent progress, I suggest focusing on calculus derivatives practice. 
                      You're 85% there!
                    </p>
                    <Link to="/ai-advisor">
                      <Button variant="secondary" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
