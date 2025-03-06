import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export function ApplicationForm({ initialData, onSuccess, onCancel }) {
  const [candidateEmail, setCandidateEmail] = useState(initialData?.candidateId.email || "");
  const [jobTitle, setJobTitle] = useState(initialData?.jobId.title || "");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("candidateEmail", candidateEmail);
    formData.append("jobTitle", jobTitle);
    if (resume) formData.append("resume", resume);

    try {
      const url = initialData ? `${baseApi}/api/applications/${initialData._id}` : `${baseApi}/api/applications`;
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to submit application");

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Application" : "Add Application"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Candidate Email"
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
