'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeUpload } from '@/components/resume-upload';
import { Button } from '@/components/ui/button';


const baseApi = process.env.NEXT_PUBLIC_API_URL;
export default function ApplyPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobId', params.id);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        router.push('/application-success');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Apply for Position</h1>
      <ResumeUpload onUpload={setFile} />
      <Button 
        className="mt-6 w-full" 
        onClick={handleSubmit}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </div>
  );
}