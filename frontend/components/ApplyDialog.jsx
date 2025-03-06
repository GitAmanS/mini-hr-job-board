"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export function ApplyDialog({ jobId, onClose }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return alert("Please upload your resume");

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resume);

    setLoading(true);
    try {
      const res = await fetch(`${baseApi}/api/applications`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token-based auth
        },
      });

      if (res.ok) {
        alert("Application submitted!");
        onClose();
      } else {
        alert("Failed to submit");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="file" onChange={(e) => setResume(e.target.files[0])} required />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
