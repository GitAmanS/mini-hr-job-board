"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/job-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${baseApi}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-2 rounded-full mb-4">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <span className="text-blue-600 font-medium">Get Hired</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Open Positions
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore opportunities that match your skills and ambitions
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
          Error loading jobs: {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job}
              className="transition-all hover:scale-[1.02] hover:shadow-lg"
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No current openings
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We don't have any positions available right now, but check back soon!
          </p>
        </div>
      )}
    </div>
  );
}