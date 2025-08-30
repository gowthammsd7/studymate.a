import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Users, 
  Plus, 
  Search,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Video,
  BookOpen,
  Star,
  UserPlus,
  UserMinus,
  Settings,
  Crown,
  Sparkles,
  Bell,
  LogOut,
  Filter,
  Globe,
  Lock,
  Zap,
  TrendingUp,
  Target,
  Award,
  Coffee,
  Headphones,
  Lightbulb
} from "lucide-react";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  type: 'study-session' | 'discussion' | 'project-group' | 'exam-prep';
  privacy: 'public' | 'private';
  memberCount: number;
  maxMembers: number;
  isJoined: boolean;
  nextSession?: Date;
  meetingType: 'online' | 'offline' | 'hybrid';
  location?: string;
  admin: {
    name: string;
    avatar?: string;
  };
  members: Array<{
    name: string;
    avatar?: string;
    role: 'admin' | 'member';
  }>;
  tags: string[];
  createdDate: Date;
  activity: 'high' | 'medium' | 'low';
  rating: number;
}

export default function StudyGroups() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: '',
    type: 'study-session' as const,
    privacy: 'public' as const,
    maxMembers: 10,
    meetingType: 'online' as const,
    location: ''
  });

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced Calculus Study Group',
      description: 'Weekly sessions focusing on calculus concepts, problem-solving, and exam preparation. All skill levels welcome!',
      subject: 'Mathematics',
      type: 'study-session',
      privacy: 'public',
      memberCount: 8,
      maxMembers: 12,
      isJoined: true,
      nextSession: new Date('2024-01-20T15:00:00'),
      meetingType: 'online',
      admin: {
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      members: [
        { name: 'Sarah Chen', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
        { name: 'Mike Johnson', role: 'member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
        { name: 'Emma Davis', role: 'member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
        { name: 'Alex Kim', role: 'member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' }
      ],
      tags: ['calculus', 'derivatives', 'integrals', 'exam-prep'],
      createdDate: new Date('2024-01-01'),
      activity: 'high',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Physics Problem Solvers',
      description: 'Collaborative problem-solving sessions for physics courses. Share solutions and learn together.',
      subject: 'Physics',
      type: 'discussion',
      privacy: 'public',
      memberCount: 15,
      maxMembers: 20,
      isJoined: false,
      nextSession: new Date('2024-01-21T14:00:00'),
      meetingType: 'hybrid',
      location: 'Library Room 204',
      admin: {
        name: 'Dr. Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=drsmith'
      },
      members: [
        { name: 'Dr. Smith', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=drsmith' }
      ],
      tags: ['mechanics', 'thermodynamics', 'problem-solving'],
      createdDate: new Date('2023-12-15'),
      activity: 'high',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Organic Chemistry Masters',
      description: 'Intensive study group for organic chemistry. Focus on reaction mechanisms and synthesis.',
      subject: 'Chemistry',
      type: 'exam-prep',
      privacy: 'private',
      memberCount: 6,
      maxMembers: 8,
      isJoined: true,
      nextSession: new Date('2024-01-22T16:00:00'),
      meetingType: 'online',
      admin: {
        name: 'Lisa Wang',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa'
      },
      members: [
        { name: 'Lisa Wang', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa' }
      ],
      tags: ['organic', 'mechanisms', 'synthesis', 'MCAT'],
      createdDate: new Date('2024-01-05'),
      activity: 'medium',
      rating: 4.9
    },
    {
      id: '4',
      name: 'History Essay Writing Circle',
      description: 'Peer review and discussion group for history essays and research papers.',
      subject: 'History',
      type: 'project-group',
      privacy: 'public',
      memberCount: 12,
      maxMembers: 15,
      isJoined: false,
      nextSession: new Date('2024-01-23T13:00:00'),
      meetingType: 'offline',
      location: 'Student Center Room 301',
      admin: {
        name: 'Prof. Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=profjohnson'
      },
      members: [
        { name: 'Prof. Johnson', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=profjohnson' }
      ],
      tags: ['essays', 'research', 'peer-review', 'writing'],
      createdDate: new Date('2023-12-20'),
      activity: 'medium',
      rating: 4.4
    }
  ]);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'English', 'Biology'];
  const groupTypes = [
    { value: 'study-session', label: 'Study Session' },
    { value: 'discussion', label: 'Discussion Group' },
    { value: 'project-group', label: 'Project Group' },
    { value: 'exam-prep', label: 'Exam Prep' }
  ];

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === '' || group.subject === selectedSubject;
    const matchesType = selectedType === '' || group.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const joinGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: true, memberCount: group.memberCount + 1 }
        : group
    ));
    
    toast({
      title: "Joined group",
      description: "You've successfully joined the study group!",
    });
  };

  const leaveGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: false, memberCount: group.memberCount - 1 }
        : group
    ));
    
    toast({
      title: "Left group",
      description: "You've left the study group.",
    });
  };

  const createNewGroup = () => {
    if (newGroup.name && newGroup.subject) {
      const group: StudyGroup = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        subject: newGroup.subject,
        type: newGroup.type,
        privacy: newGroup.privacy,
        memberCount: 1,
        maxMembers: newGroup.maxMembers,
        isJoined: true,
        meetingType: newGroup.meetingType,
        location: newGroup.location || undefined,
        admin: {
          name: user?.name || 'You',
          avatar: user?.avatar
        },
        members: [{
          name: user?.name || 'You',
          role: 'admin',
          avatar: user?.avatar
        }],
        tags: [],
        createdDate: new Date(),
        activity: 'low',
        rating: 0
      };
      
      setStudyGroups(prev => [group, ...prev]);
      setNewGroup({
        name: '',
        description: '',
        subject: '',
        type: 'study-session',
        privacy: 'public',
        maxMembers: 10,
        meetingType: 'online',
        location: ''
      });
      
      toast({
        title: "Study group created",
        description: "Your new study group has been created successfully.",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study-session': return BookOpen;
      case 'discussion': return MessageCircle;
      case 'project-group': return Users;
      case 'exam-prep': return Target;
      default: return BookOpen;
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const myGroups = studyGroups.filter(group => group.isJoined);
  const recommendedGroups = studyGroups.filter(group => !group.isJoined && group.privacy === 'public').slice(0, 3);

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
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
                <p className="text-gray-600">Join collaborative study sessions and connect with peers</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Study Group</DialogTitle>
                  <DialogDescription>
                    Create a study group to collaborate with peers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input
                      id="groupName"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Advanced Physics Study Group"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupDescription">Description</Label>
                    <Textarea
                      id="groupDescription"
                      value={newGroup.description}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of your study group"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupSubject">Subject</Label>
                      <Select onValueChange={(value) => setNewGroup(prev => ({ ...prev, subject: value }))}>
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
                    <div>
                      <Label htmlFor="groupType">Type</Label>
                      <Select onValueChange={(value: any) => setNewGroup(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {groupTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="privacy">Privacy</Label>
                      <Select onValueChange={(value: any) => setNewGroup(prev => ({ ...prev, privacy: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Public" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxMembers">Max Members</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        value={newGroup.maxMembers}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, maxMembers: parseInt(e.target.value) || 10 }))}
                        min="3"
                        max="50"
                      />
                    </div>
                  </div>
                  <Button onClick={createNewGroup} className="w-full">
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="browse">Browse Groups</TabsTrigger>
            <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          {/* Browse Groups Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search study groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Select onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-48">
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
                    <Select onValueChange={setSelectedType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {groupTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          {group.privacy === 'private' && <Lock className="w-4 h-4 text-gray-500" />}
                        </div>
                        <CardDescription className="mb-3">{group.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{group.subject}</Badge>
                          <Badge className="capitalize">
                            {React.createElement(getTypeIcon(group.type), { className: "w-3 h-3 mr-1" })}
                            {group.type.replace('-', ' ')}
                          </Badge>
                          <Badge variant="secondary">
                            {group.memberCount}/{group.maxMembers} members
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{group.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Admin and Members */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={group.admin.avatar} />
                          <AvatarFallback>{group.admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {group.admin.name}
                            <Crown className="w-3 h-3 inline ml-1 text-yellow-500" />
                          </p>
                          <p className="text-xs text-gray-500">Group Admin</p>
                        </div>
                      </div>

                      {/* Next Session */}
                      {group.nextSession && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Next: {group.nextSession.toLocaleDateString()} at {group.nextSession.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      )}

                      {/* Meeting Info */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          {group.meetingType === 'online' && <Video className="w-4 h-4" />}
                          {group.meetingType === 'offline' && <MapPin className="w-4 h-4" />}
                          {group.meetingType === 'hybrid' && <Globe className="w-4 h-4" />}
                          <span className="capitalize">{group.meetingType}</span>
                          {group.location && <span>• {group.location}</span>}
                        </div>
                        <div className={`flex items-center space-x-1 ${getActivityColor(group.activity)}`}>
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                          <span className="text-xs capitalize">{group.activity} activity</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {group.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {group.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{group.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {group.isJoined ? (
                          <Button 
                            variant="outline" 
                            onClick={() => leaveGroup(group.id)}
                            className="w-full"
                          >
                            <UserMinus className="mr-2 h-4 w-4" />
                            Leave Group
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => joinGroup(group.id)}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                            disabled={group.memberCount >= group.maxMembers}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            {group.memberCount >= group.maxMembers ? 'Group Full' : 'Join Group'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Groups Tab */}
          <TabsContent value="my-groups" className="space-y-6">
            {myGroups.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myGroups.map((group) => (
                  <Card key={group.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {group.name}
                            {group.admin.name === user?.name && <Crown className="w-4 h-4 ml-2 text-yellow-500" />}
                          </CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <Badge className={getActivityColor(group.activity)}>
                          {group.activity} activity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Next Session */}
                        {group.nextSession && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-blue-900">Upcoming Session</span>
                            </div>
                            <p className="text-sm text-blue-700">
                              {group.nextSession.toLocaleDateString()} at {group.nextSession.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {group.location && (
                              <p className="text-sm text-blue-700">📍 {group.location}</p>
                            )}
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                          {group.admin.name === user?.name && (
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-8 pb-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups joined yet</h3>
                  <p className="text-gray-600 mb-4">
                    Browse and join study groups to start collaborating with peers
                  </p>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Browse Groups
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-6">
            {/* AI Recommendations */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-8 h-8 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">AI Recommendations</h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Based on your study patterns and subjects, here are some groups that might interest you:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/20 text-white">Similar study schedule</Badge>
                      <Badge className="bg-white/20 text-white">Matching subjects</Badge>
                      <Badge className="bg-white/20 text-white">Compatible learning style</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedGroups.map((group) => (
                <Card key={group.id} className="bg-white/70 backdrop-blur-sm border-white/20 relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg pr-20">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{group.subject}</Badge>
                      <Badge className="capitalize">
                        {React.createElement(getTypeIcon(group.type), { className: "w-3 h-3 mr-1" })}
                        {group.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{group.memberCount}/{group.maxMembers} members</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{group.rating}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => joinGroup(group.id)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Join Recommended Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
