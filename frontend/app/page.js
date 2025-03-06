// app/page.js
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Briefcase, Upload, UserCheck } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    router.push(`/jobs?search=${query}`);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-4 border-b">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next <span className="text-blue-600">Career Opportunity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 mx-auto max-w-3xl">
            Bridge between top talent and leading companies through intelligent recruitment solutions.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-3 shadow-lg rounded-lg p-1 bg-white">
            <Input
              name="search"
              placeholder="Search jobs by title, skills, or location"
              className="py-6 text-lg border-0 focus-visible:ring-0"
            />
            <Button type="submit" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Search Jobs
            </Button>
          </form>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            {isLoggedIn ? (
              <Button 
                onClick={() => router.push('/jobs')} 
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                Browse Open Positions
              </Button>
            ) : (
              <>
                <Button asChild className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                  <Link href="/register">Start Your Journey</Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="px-8 py-6 text-lg border-gray-300 hover:bg-gray-50"
                >
                  <Link href="/login">Recruiter Portal</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why TalentBridge?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-blue-100 w-fit p-4 rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Streamlined Job Posting</h3>
              <p className="text-gray-600 leading-relaxed">
                Effortlessly create and manage job listings with our recruiter-friendly dashboard.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-blue-100 w-fit p-4 rounded-full mb-6">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Applications</h3>
              <p className="text-gray-600 leading-relaxed">
                Automated resume parsing and instant profile creation for seamless applications.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-blue-100 w-fit p-4 rounded-full mb-6">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Intelligent Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Machine learning algorithms that connect talent with ideal opportunities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-gray-200 mb-8 text-lg">
              Join thousands who've found their perfect match through our platform.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                asChild
                className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-6 text-lg"
              >
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-white text-white hover:bg-blue-800 px-10 py-6 text-lg"
              >
                <Link href="/login">Existing User? Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}