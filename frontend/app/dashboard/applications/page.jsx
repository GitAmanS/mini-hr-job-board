"use client";
import { useEffect, useState } from "react";
import { ApplicationTable } from "@/components/application-table";
import { ApplicationForm } from "@/components/application-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function DashboardApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseApi}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseApi}/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete application");
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          New Application
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      )}

      {isFormOpen && (
        <ApplicationForm
          initialData={selectedApplication}
          onSuccess={() => {
            fetchApplications();
            setIsFormOpen(false);
            setSelectedApplication(null);
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : applications.length > 0 ? (
        <ApplicationTable
          applications={applications}
          onEdit={(app) => {
            setSelectedApplication(app);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No applications found</p>
          <Button onClick={() => setIsFormOpen(true)}>
            Create New Application
          </Button>
        </div>
      )}
    </div>
  );
}