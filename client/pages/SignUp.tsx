import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-gray-600 mt-2">Create your study account</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-slate-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600 mb-4">
            This page is under development. Continue prompting to help build out this Sign Up feature!
          </p>
          <div className="space-y-2">
            <Link to="/">
              <Button className="w-full">Return to Homepage</Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" className="w-full">Go to Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
