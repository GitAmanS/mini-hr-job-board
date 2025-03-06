"use client";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

  useEffect(() => { fetchJobs(); }, []);

  async function handleFormSubmit(data) {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const url = editingJob ? `${baseApi}/api/jobs/${editingJob._id}` : `${baseApi}/api/jobs`;
      const method = editingJob ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error(`Failed to ${editingJob ? 'update' : 'create'} job`);
      const result = await res.json();
      
      setJobs(prev => editingJob ? 
        prev.map(j => j._id === result._id ? result : j) : 
        [result, ...prev]
      );
      
      reset();
      setIsDialogOpen(false);
      setEditingJob(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-xl" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-sm text-gray-600 mt-1">
            {jobs.length} active position{jobs.length !== 1 && 's'}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { reset(); setEditingJob(null); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg">
                {editingJob ? "Edit Job Posting" : "Create New Job"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <Input
                  {...register("title", { required: "Title is required" })}
                  placeholder="Senior Software Engineer"
                  className={errors.title && "border-red-500"}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Job requirements and responsibilities..."
                  rows={5}
                  className={errors.description && "border-red-500"}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingJob ? (
                  "Update Position"
                ) : (
                  "Create Position"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          Error: {error}
        </div>
      )}

      {jobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isDashboard
              onDelete={() => setJobs(prev => prev.filter(j => j._id !== job._id))}
              handleEdit={() => {
                setEditingJob(job);
                reset({ title: job.title, description: job.description });
                setIsDialogOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600 mb-4">No active job postings</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Job
          </Button>
        </div>
      )}
    </div>
  );
}