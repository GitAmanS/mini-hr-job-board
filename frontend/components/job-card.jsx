"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyDialog } from "./ApplyDialog";
import { Pen, Trash2, Briefcase, MapPin, Clock, Zap } from "lucide-react";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export function JobCard({ job, isDashboard = false, onDelete, handleEdit }) {
  const [isApplying, setIsApplying] = useState(false);

  const statusStyles = {
    active: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    closed: "bg-red-100 text-red-800"
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseApi}/api/jobs/${job._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete job");
      
      onDelete(job._id);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-200 group">
      {/* Status Badge */}
      <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[job.status]}`}>
        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
      </div>

      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{job.company || "Our Company"}</p>
          </div>
        </div>

        {/* Details Row */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location || "Remote"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{job.type || "Full-time"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {job.description}
        </p>

        {/* Action Buttons */}
        <div className="border-t pt-4">
          {isDashboard ? (
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => handleEdit(job)}
                className="gap-2 px-4"
              >
                <Pen className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="gap-2 px-4"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsApplying(true)}
              className="w-full gap-2 py-2"
              variant="default"
            >
              <Zap className="h-4 w-4" />
              Apply Now
            </Button>
          )}
        </div>
      </div>

      {/* Application Dialog */}
      {isApplying && (
        <ApplyDialog 
          jobId={job._id}
          onClose={() => setIsApplying(false)}
        />
      )}
    </div>
  );
}