import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth-context";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  HelpCircle, 
  Send,
  Paperclip,
  Image,
  Calculator,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Plus,
  FileText,
  Clock,
  Zap,
  Brain,
  Target
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  subject?: string;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

interface Conversation {
  id: string;
  title: string;
  subject: string;
  lastMessage: Date;
  messages: Message[];
}

export default function Assistance() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Calculus Derivatives Help',
      subject: 'Mathematics',
      lastMessage: new Date('2024-01-16T14:30:00'),
      messages: [
        {
          id: '1-1',
          type: 'user',
          content: 'Can you help me understand the chain rule for derivatives?',
          timestamp: new Date('2024-01-16T14:25:00'),
          subject: 'Mathematics'
        },
        {
          id: '1-2',
          type: 'assistant',
          content: 'Of course! The chain rule is used when you have a composition of functions. If you have f(g(x)), then the derivative is f\'(g(x)) × g\'(x).\n\nFor example, if h(x) = (3x + 2)², you can think of this as:\n- Outer function: f(u) = u²\n- Inner function: g(x) = 3x + 2\n\nUsing the chain rule:\nh\'(x) = 2(3x + 2) × 3 = 6(3x + 2) = 18x + 12\n\nWould you like me to work through another example?',
          timestamp: new Date('2024-01-16T14:26:00')
        },
        {
          id: '1-3',
          type: 'user',
          content: 'Yes, can you show me how to find the derivative of sin(x²)?',
          timestamp: new Date('2024-01-16T14:28:00'),
          subject: 'Mathematics'
        },
        {
          id: '1-4',
          type: 'assistant',
          content: 'Great example! For sin(x²), we have:\n\n- Outer function: f(u) = sin(u)\n- Inner function: g(x) = x²\n\nApplying the chain rule:\n\nStep 1: Find the derivative of the outer function\nf\'(u) = cos(u)\n\nStep 2: Find the derivative of the inner function\ng\'(x) = 2x\n\nStep 3: Apply the chain rule\nd/dx[sin(x²)] = cos(x²) × 2x = 2x cos(x²)\n\nThe key is to always identify the inner and outer functions first!',
          timestamp: new Date('2024-01-16T14:30:00')
        }
      ]
    },
    {
      id: '2',
      title: 'Physics Force Problems',
      subject: 'Physics',
      lastMessage: new Date('2024-01-15T16:45:00'),
      messages: [
        {
          id: '2-1',
          type: 'user',
          content: 'I\'m struggling with Newton\'s second law problems. Can you help?',
          timestamp: new Date('2024-01-15T16:40:00'),
          subject: 'Physics'
        },
        {
          id: '2-2',
          type: 'assistant',
          content: 'Absolutely! Newton\'s second law states that F = ma (Force = mass × acceleration).\n\nHere\'s a step-by-step approach for solving these problems:\n\n1. **Identify all forces** acting on the object\n2. **Draw a free body diagram**\n3. **Choose a coordinate system** (usually x and y axes)\n4. **Apply ΣF = ma** for each direction\n5. **Solve the resulting equations**\n\nWould you like to work through a specific problem together?',
          timestamp: new Date('2024-01-15T16:42:00')
        },
        {
          id: '2-3',
          type: 'user',
          content: 'Yes! A 10 kg box is being pushed across a floor with a force of 50 N. If the coefficient of friction is 0.3, what\'s the acceleration?',
          timestamp: new Date('2024-01-15T16:44:00'),
          subject: 'Physics'
        },
        {
          id: '2-4',
          type: 'assistant',
          content: 'Perfect example! Let\'s solve this step by step:\n\n**Given:**\n- Mass (m) = 10 kg\n- Applied force (F) = 50 N\n- Coefficient of friction (μ) = 0.3\n- g = 9.8 m/s²\n\n**Step 1:** Find the normal force\nN = mg = 10 × 9.8 = 98 N\n\n**Step 2:** Find the friction force\nf = μN = 0.3 × 98 = 29.4 N\n\n**Step 3:** Apply Newton\'s second law\nNet force = Applied force - Friction force\nF_net = 50 - 29.4 = 20.6 N\n\n**Step 4:** Calculate acceleration\na = F_net/m = 20.6/10 = 2.06 m/s²\n\nThe box accelerates at 2.06 m/s² in the direction of the applied force.',
          timestamp: new Date('2024-01-15T16:45:00')
        }
      ]
    }
  ]);

  const quickActions = [
    {
      icon: Calculator,
      title: 'Solve Math Problem',
      description: 'Get step-by-step solutions',
      prompt: 'I need help solving this math problem: '
    },
    {
      icon: Lightbulb,
      title: 'Explain Concept',
      description: 'Understand difficult topics',
      prompt: 'Can you explain this concept to me: '
    },
    {
      icon: FileText,
      title: 'Check My Work',
      description: 'Review your solutions',
      prompt: 'Can you check if my solution is correct? '
    },
    {
      icon: Target,
      title: 'Study Strategy',
      description: 'Get study recommendations',
      prompt: 'What\'s the best way to study '
    }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'English', 'Biology'];

  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const sendMessage = async (content: string, subject?: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      subject: subject || selectedSubject
    };

    // If no active conversation, create a new one
    if (!activeConversation) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: content.trim().slice(0, 50) + (content.length > 50 ? '...' : ''),
        subject: subject || selectedSubject || 'General',
        lastMessage: new Date(),
        messages: [userMessage]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversation(newConversation.id);
    } else {
      // Add to existing conversation
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversation 
          ? { 
              ...conv, 
              messages: [...conv.messages, userMessage],
              lastMessage: new Date()
            }
          : conv
      ));
    }

    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(content, subject || selectedSubject),
        timestamp: new Date()
      };

      setConversations(prev => prev.map(conv => 
        conv.id === (activeConversation || Date.now().toString())
          ? { 
              ...conv, 
              messages: [...conv.messages, aiResponse],
              lastMessage: new Date()
            }
          : conv
      ));
      
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string, subject: string) => {
    // Simple response generation based on keywords
    const input = userInput.toLowerCase();
    
    if (input.includes('derivative') || input.includes('calculus')) {
      return "I'd be happy to help with calculus! For derivatives, remember the key rules:\n\n• Power rule: d/dx[x^n] = nx^(n-1)\n• Product rule: d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\n• Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)\n\nCould you share the specific problem you're working on?";
    }
    
    if (input.includes('physics') || input.includes('force') || input.includes('motion')) {
      return "Physics can be tricky, but let's break it down! For mechanics problems:\n\n1. **Identify the system** and what you're solving for\n2. **List known values** and unknowns\n3. **Draw diagrams** (free body diagrams are crucial)\n4. **Choose appropriate equations** (kinematic, Newton's laws, etc.)\n5. **Solve step by step**\n\nWhat specific physics concept are you working with?";
    }
    
    if (input.includes('chemistry') || input.includes('reaction') || input.includes('equation')) {
      return "Chemistry problems often involve balancing equations and understanding molecular interactions. Here are some tips:\n\n• **Balance chemical equations** by ensuring equal atoms on both sides\n• **Use dimensional analysis** for unit conversions\n• **Remember significant figures** in calculations\n• **Understand molarity** and stoichiometry relationships\n\nWhat chemistry topic would you like help with?";
    }
    
    if (input.includes('study') || input.includes('strategy') || input.includes('tips')) {
      return "Great question about study strategies! Here are some evidence-based techniques:\n\n• **Active recall**: Test yourself frequently\n• **Spaced repetition**: Review material at increasing intervals\n• **Pomodoro Technique**: 25-minute focused study sessions\n• **Practice problems**: Apply concepts, don't just read\n• **Teach others**: Explaining concepts reinforces understanding\n\nWhich subject are you looking to improve your study approach for?";
    }
    
    return `I understand you're asking about "${userInput}". I'm here to help with any academic questions you have! \n\nCould you provide a bit more detail about what specifically you'd like help with? For example:\n• A specific problem you're working on\n• A concept you'd like explained\n• Study strategies for a particular subject\n\nThe more context you provide, the better I can assist you!`;
  };

  const startNewConversation = () => {
    setActiveConversation(null);
    setCurrentMessage('');
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Message copied",
      description: "The message has been copied to your clipboard.",
    });
  };

  const useQuickAction = (prompt: string) => {
    setCurrentMessage(prompt);
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Study Assistant</h1>
                <p className="text-gray-600">Get instant help with homework, concepts, and study strategies</p>
              </div>
            </div>
            
            <Button 
              onClick={startNewConversation}
              className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Sidebar - Conversation History */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-lg">Chat History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2 p-4">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => selectConversation(conversation.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          activeConversation === conversation.id
                            ? 'bg-purple-100 border border-purple-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {conversation.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {conversation.subject}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessage.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 h-full flex flex-col">
              {!activeConversation ? (
                /* Welcome Screen */
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Welcome to AI Study Assistant
                    </h2>
                    <p className="text-gray-600 mb-8">
                      I'm here to help you with homework, explain concepts, and provide study strategies. 
                      Choose a quick action below or start typing your question!
                    </p>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => useQuickAction(action.prompt)}
                          className="h-auto p-4 text-left"
                        >
                          <div className="flex items-start space-x-3">
                            <action.icon className="w-5 h-5 text-purple-500 mt-1" />
                            <div>
                              <h4 className="font-medium text-gray-900">{action.title}</h4>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Subject Selection */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Subject:</span>
                      <Select onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select subject (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Interface */
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{currentConversation?.title}</CardTitle>
                        <CardDescription>
                          Subject: {currentConversation?.subject}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={startNewConversation}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        {currentConversation?.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex space-x-3 ${
                              message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.type === 'assistant' && (
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-purple-100">
                                  <Bot className="w-4 h-4 text-purple-600" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                              <div
                                className={`p-3 rounded-lg ${
                                  message.type === 'user'
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                              </div>
                              <div className={`flex items-center space-x-2 mt-1 ${
                                message.type === 'user' ? 'justify-end' : 'justify-start'
                              }`}>
                                <span className="text-xs text-gray-500">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                {message.type === 'assistant' && (
                                  <div className="flex space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => copyMessage(message.content)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <ThumbsDown className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {message.type === 'user' && (
                              <Avatar className="w-8 h-8 order-3">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>
                                  <User className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-purple-100">
                                <Bot className="w-4 h-4 text-purple-600" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask me anything about your studies..."
                      className="min-h-[40px] max-h-[120px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(currentMessage);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => sendMessage(currentMessage)}
                      disabled={!currentMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
