'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Briefcase, List, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Recruiter Dashboard</h1>
              <div className="hidden md:flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/dashboard/applications')}
                  className={`gap-2 px-4 py-2 rounded-none ${
                    isActive('/dashboard/applications')
                      ? 'border-b-2 border-primary text-primary font-medium bg-blue-50/50'
                      : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                  Applications
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/dashboard/jobs')}
                  className={`gap-2 px-4 py-2 rounded-none ${
                    isActive('/dashboard/jobs')
                      ? 'border-b-2 border-primary text-primary font-medium bg-blue-50/50'
                      : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Jobs
                </Button>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="gap-2 text-red-600 hover:text-red-700 border-red-100 hover:border-red-200 bg-red-50/50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}