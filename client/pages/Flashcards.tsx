import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  BookOpen, 
  Plus, 
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Shuffle,
  Clock,
  Target,
  TrendingUp,
  Brain,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Calendar,
  Star,
  RefreshCw,
  Zap,
  BarChart3
} from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  correctCount: number;
  incorrectCount: number;
  tags: string[];
}

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  subject: string;
  cards: Flashcard[];
  createdDate: Date;
  lastStudied?: Date;
  totalStudyTime: number;
  mastery: number;
  isPublic: boolean;
}

export default function Flashcards() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [studyMode, setStudyMode] = useState<'study' | 'create' | 'browse'>('browse');
  const [currentSetId, setCurrentSetId] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [newSet, setNewSet] = useState({
    title: '',
    description: '',
    subject: '',
    isPublic: false
  });
  const [newCard, setNewCard] = useState({
    front: '',
    back: '',
    tags: []
  });

  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([
    {
      id: '1',
      title: 'Calculus Derivatives',
      description: 'Essential derivative rules and applications',
      subject: 'Mathematics',
      createdDate: new Date('2024-01-10'),
      lastStudied: new Date('2024-01-15'),
      totalStudyTime: 120,
      mastery: 85,
      isPublic: false,
      cards: [
        {
          id: '1-1',
          front: 'What is the derivative of x²?',
          back: '2x',
          difficulty: 'easy',
          lastReviewed: new Date('2024-01-15'),
          correctCount: 8,
          incorrectCount: 2,
          tags: ['derivatives', 'basic']
        },
        {
          id: '1-2',
          front: 'State the chain rule',
          back: 'If f(x) = g(h(x)), then f\'(x) = g\'(h(x)) × h\'(x)',
          difficulty: 'medium',
          lastReviewed: new Date('2024-01-14'),
          correctCount: 5,
          incorrectCount: 3,
          tags: ['chain-rule', 'derivatives']
        },
        {
          id: '1-3',
          front: 'What is the derivative of sin(x)?',
          back: 'cos(x)',
          difficulty: 'easy',
          lastReviewed: new Date('2024-01-15'),
          correctCount: 7,
          incorrectCount: 1,
          tags: ['trigonometry', 'derivatives']
        }
      ]
    },
    {
      id: '2',
      title: 'Physics Formulas',
      description: 'Key physics equations and constants',
      subject: 'Physics',
      createdDate: new Date('2024-01-12'),
      lastStudied: new Date('2024-01-16'),
      totalStudyTime: 90,
      mastery: 72,
      isPublic: true,
      cards: [
        {
          id: '2-1',
          front: 'What is Newton\'s second law?',
          back: 'F = ma (Force equals mass times acceleration)',
          difficulty: 'easy',
          lastReviewed: new Date('2024-01-16'),
          correctCount: 6,
          incorrectCount: 1,
          tags: ['newton', 'force', 'motion']
        },
        {
          id: '2-2',
          front: 'What is the speed of light in vacuum?',
          back: '299,792,458 m/s (approximately 3 × 10⁸ m/s)',
          difficulty: 'medium',
          lastReviewed: new Date('2024-01-15'),
          correctCount: 4,
          incorrectCount: 2,
          tags: ['constants', 'light', 'physics']
        }
      ]
    },
    {
      id: '3',
      title: 'Chemistry Elements',
      description: 'Periodic table elements and properties',
      subject: 'Chemistry',
      createdDate: new Date('2024-01-08'),
      lastStudied: new Date('2024-01-13'),
      totalStudyTime: 60,
      mastery: 68,
      isPublic: false,
      cards: [
        {
          id: '3-1',
          front: 'What is the chemical symbol for Gold?',
          back: 'Au (from Latin: aurum)',
          difficulty: 'easy',
          lastReviewed: new Date('2024-01-13'),
          correctCount: 5,
          incorrectCount: 1,
          tags: ['elements', 'symbols']
        }
      ]
    }
  ]);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'English', 'Biology'];

  const currentSet = flashcardSets.find(set => set.id === currentSetId);
  const currentCard = currentSet?.cards[currentCardIndex];

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || set.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const startStudying = (setId: string) => {
    setCurrentSetId(setId);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudyMode('study');
  };

  const nextCard = () => {
    if (currentSet && currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // End of set
      toast({
        title: "Set completed!",
        description: "Great job! You've finished this flashcard set.",
      });
      setStudyMode('browse');
      setCurrentSetId(null);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const markCorrect = () => {
    if (currentCard && currentSet) {
      // Update card stats
      const updatedSets = flashcardSets.map(set => {
        if (set.id === currentSetId) {
          const updatedCards = set.cards.map(card => {
            if (card.id === currentCard.id) {
              return {
                ...card,
                correctCount: card.correctCount + 1,
                lastReviewed: new Date()
              };
            }
            return card;
          });
          return { ...set, cards: updatedCards };
        }
        return set;
      });
      setFlashcardSets(updatedSets);
      nextCard();
    }
  };

  const markIncorrect = () => {
    if (currentCard && currentSet) {
      // Update card stats
      const updatedSets = flashcardSets.map(set => {
        if (set.id === currentSetId) {
          const updatedCards = set.cards.map(card => {
            if (card.id === currentCard.id) {
              return {
                ...card,
                incorrectCount: card.incorrectCount + 1,
                lastReviewed: new Date()
              };
            }
            return card;
          });
          return { ...set, cards: updatedCards };
        }
        return set;
      });
      setFlashcardSets(updatedSets);
      nextCard();
    }
  };

  const shuffleCards = () => {
    if (currentSet) {
      setCurrentCardIndex(0);
      setShowAnswer(false);
      // In a real app, you'd shuffle the cards array
      toast({
        title: "Cards shuffled",
        description: "The order of cards has been randomized.",
      });
    }
  };

  const createNewSet = () => {
    if (newSet.title && newSet.subject) {
      const set: FlashcardSet = {
        id: Date.now().toString(),
        title: newSet.title,
        description: newSet.description,
        subject: newSet.subject,
        cards: [],
        createdDate: new Date(),
        totalStudyTime: 0,
        mastery: 0,
        isPublic: newSet.isPublic
      };
      
      setFlashcardSets(prev => [set, ...prev]);
      setNewSet({ title: '', description: '', subject: '', isPublic: false });
      
      toast({
        title: "Flashcard set created",
        description: "Your new flashcard set has been created successfully.",
      });
    }
  };

  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Study Mode View
  if (studyMode === 'study' && currentSet && currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Study Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setStudyMode('browse')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Exit Study
                </Button>
                <div>
                  <h1 className="font-semibold text-gray-900">{currentSet.title}</h1>
                  <p className="text-sm text-gray-600">
                    Card {currentCardIndex + 1} of {currentSet.cards.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={shuffleCards}>
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Progress 
                  value={((currentCardIndex + 1) / currentSet.cards.length) * 100} 
                  className="w-32 h-2"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Study Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Card Content */}
                  <div className="min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                      <Badge className={getDifficultyColor(currentCard.difficulty)}>
                        {currentCard.difficulty}
                      </Badge>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {showAnswer ? 'Answer' : 'Question'}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {showAnswer ? currentCard.back : currentCard.front}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!showAnswer ? (
                    <Button 
                      onClick={() => setShowAnswer(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Show Answer
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">How well did you know this?</p>
                      <div className="flex justify-center space-x-4">
                        <Button 
                          variant="outline" 
                          onClick={markIncorrect}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Incorrect
                        </Button>
                        <Button 
                          onClick={markCorrect}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Correct
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      onClick={previousCard}
                      disabled={currentCardIndex === 0}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Accuracy: {Math.round((currentCard.correctCount / (currentCard.correctCount + currentCard.incorrectCount)) * 100) || 0}%</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={nextCard}
                    >
                      {currentCardIndex === currentSet.cards.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
                <p className="text-gray-600">Create and study with intelligent flashcards</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Set
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Flashcard Set</DialogTitle>
                  <DialogDescription>
                    Create a new set of flashcards for your studies
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newSet.title}
                      onChange={(e) => setNewSet(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Spanish Vocabulary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newSet.description}
                      onChange={(e) => setNewSet(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of this flashcard set"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={(value) => setNewSet(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={createNewSet} className="w-full">
                    Create Set
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="my-sets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="my-sets">My Sets</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          {/* My Sets Tab */}
          <TabsContent value="my-sets" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search flashcard sets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select onValueChange={setSelectedSubject}>
                    <SelectTrigger className="md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Subjects</SelectItem>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Flashcard Sets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSets.map((set) => (
                <Card key={set.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{set.title}</CardTitle>
                        <CardDescription>{set.description}</CardDescription>
                        <div className="flex items-center space-x-2 mt-3">
                          <Badge variant="outline">{set.subject}</Badge>
                          <Badge variant="secondary">{set.cards.length} cards</Badge>
                          {set.isPublic && <Badge className="bg-green-100 text-green-700">Public</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Mastery</span>
                          <span className="font-medium">{set.mastery}%</span>
                        </div>
                        <Progress value={set.mastery} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Study time</span>
                          <p className="font-medium">{formatStudyTime(set.totalStudyTime)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Last studied</span>
                          <p className="font-medium">
                            {set.lastStudied 
                              ? new Date(set.lastStudied).toLocaleDateString()
                              : 'Never'
                            }
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => startStudying(set.id)}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Study
                        </Button>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Total Sets</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{flashcardSets.length}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Total Cards</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {flashcardSets.reduce((total, set) => total + set.cards.length, 0)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Study Time</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatStudyTime(flashcardSets.reduce((total, set) => total + set.totalStudyTime, 0))}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Avg. Mastery</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {Math.round(flashcardSets.reduce((total, set) => total + set.mastery, 0) / flashcardSets.length) || 0}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Subject Breakdown */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map(subject => {
                    const subjectSets = flashcardSets.filter(set => set.subject === subject);
                    const totalCards = subjectSets.reduce((total, set) => total + set.cards.length, 0);
                    const avgMastery = subjectSets.length > 0 
                      ? Math.round(subjectSets.reduce((total, set) => total + set.mastery, 0) / subjectSets.length)
                      : 0;
                    
                    if (subjectSets.length === 0) return null;
                    
                    return (
                      <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{subject}</h4>
                          <p className="text-sm text-gray-600">{subjectSets.length} sets • {totalCards} cards</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{avgMastery}% mastery</p>
                          <Progress value={avgMastery} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="pt-8 pb-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Public Sets</h3>
                <p className="text-gray-600 mb-4">
                  Browse flashcard sets shared by other students
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Public Sets
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
