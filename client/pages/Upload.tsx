import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  File, 
  CheckCircle2, 
  Clock, 
  X,
  Brain,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Plus,
  FolderOpen,
  Tag,
  Calendar
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  subject: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  uploadDate: Date;
  tags: string[];
  aiAnalysis?: {
    summary: string;
    keyTopics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedStudyTime: string;
  };
}

export default function Upload() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Calculus_Chapter_5_Notes.pdf',
      type: 'application/pdf',
      size: 2456789,
      subject: 'Mathematics',
      status: 'completed',
      progress: 100,
      uploadDate: new Date('2024-01-15'),
      tags: ['derivatives', 'calculus', 'math'],
      aiAnalysis: {
        summary: 'Comprehensive notes on derivatives including chain rule and applications.',
        keyTopics: ['Chain Rule', 'Product Rule', 'Quotient Rule', 'Applications'],
        difficulty: 'intermediate',
        estimatedStudyTime: '2-3 hours'
      }
    },
    {
      id: '2',
      name: 'Physics_Lab_Report_3.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 1234567,
      subject: 'Physics',
      status: 'processing',
      progress: 65,
      uploadDate: new Date('2024-01-16'),
      tags: ['lab', 'thermodynamics', 'physics']
    },
    {
      id: '3',
      name: 'Chemistry_Formulas.jpg',
      type: 'image/jpeg',
      size: 876543,
      subject: 'Chemistry',
      status: 'completed',
      progress: 100,
      uploadDate: new Date('2024-01-14'),
      tags: ['formulas', 'organic', 'chemistry'],
      aiAnalysis: {
        summary: 'Collection of organic chemistry formulas and molecular structures.',
        keyTopics: ['Molecular Structure', 'Bonding', 'Functional Groups'],
        difficulty: 'beginner',
        estimatedStudyTime: '1-2 hours'
      }
    }
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        subject: selectedSubject || 'General',
        status: 'uploading',
        progress: 0,
        uploadDate: new Date(),
        tags: []
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });

    toast({
      title: "Upload started",
      description: `Uploading ${files.length} file(s)...`,
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, status: 'processing', progress: 100 }
            : file
        ));
        
        // Simulate AI processing
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  status: 'completed',
                  aiAnalysis: {
                    summary: 'AI analysis completed. This document contains important study material.',
                    keyTopics: ['Key Topic 1', 'Key Topic 2', 'Key Topic 3'],
                    difficulty: 'intermediate',
                    estimatedStudyTime: '1-2 hours'
                  },
                  tags: ['ai-generated', 'study-material']
                }
              : file
          ));
          
          toast({
            title: "AI Analysis Complete",
            description: "Your file has been processed and analyzed by AI.",
          });
        }, 3000);
      } else {
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        ));
      }
    }, 500);
  };

  const deleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "File deleted",
      description: "File has been removed from your uploads.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === '' || file.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'English', 'Biology'];

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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <UploadIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upload Materials</h1>
              <p className="text-gray-600">Upload and organize your study materials with AI analysis</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="library">My Library</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            {/* Upload Zone */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-green-500" />
                  Upload New Materials
                </CardTitle>
                <CardDescription>Drag and drop files or click to browse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Subject Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={setSelectedSubject}>
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
                  </div>

                  {/* Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drop your files here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                    />
                    <label htmlFor="file-upload">
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                        Choose Files
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            {uploadedFiles.filter(f => f.status === 'uploading' || f.status === 'processing').length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Uploads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadedFiles
                      .filter(file => file.status === 'uploading' || file.status === 'processing')
                      .map((file) => (
                        <div key={file.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className="p-2 bg-gray-100 rounded">
                            {React.createElement(getFileIcon(file.type), { className: "w-5 h-5 text-gray-600" })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{file.name}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                              <Badge variant="outline">{file.subject}</Badge>
                              <Badge variant={file.status === 'uploading' ? 'default' : 'secondary'}>
                                {file.status}
                              </Badge>
                            </div>
                            <Progress value={file.progress} className="mt-2 h-2" />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search files, tags, or content..."
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

            {/* File Library */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFiles
                .filter(file => file.status === 'completed')
                .map((file) => (
                  <Card key={file.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            {React.createElement(getFileIcon(file.type), { className: "w-5 h-5 text-green-600" })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                              <Badge variant="outline">{file.subject}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteFile(file.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {file.aiAnalysis && (
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">AI Analysis</span>
                          </div>
                          <p className="text-sm text-gray-600">{file.aiAnalysis.summary}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {file.aiAnalysis.keyTopics.map((topic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Difficulty: {file.aiAnalysis.difficulty}</span>
                            <span>Study time: {file.aiAnalysis.estimatedStudyTime}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {file.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
            </div>

            {filteredFiles.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="pt-8 pb-8 text-center">
                  <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedSubject 
                      ? "Try adjusting your search or filter criteria"
                      : "Upload your first study materials to get started"
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
