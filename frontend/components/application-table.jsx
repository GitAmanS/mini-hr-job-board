import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export function ApplicationTable({ applications, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Candidate
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Resume
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">
                <div className="font-medium text-gray-900">
                  {app?.candidateId?.name}
                </div>
                <div className="text-gray-500">{app?.candidateId?.email}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {app?.jobId?.title}
              </td>
              <td className="px-6 py-4 text-sm">
                <a
                  href={`${baseApi}/api${app?.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Resume
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-right space-x-2">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(app)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Pen className="h-4 w-4" />
                </Button> */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(app?._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}