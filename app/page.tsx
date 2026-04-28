'use client';

import { useState } from 'react';
import { PipelineResponse } from '@/lib/schemas/contracts';

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PipelineResponse | null>(null);

  const handleProcess = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/process-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenantId: "tenant-123", documentText: inputText })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Agentic AI Operations Dashboard</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Raw Document Text (OCR Input)</label>
        <textarea 
          className="w-full p-3 border rounded shadow-sm h-32"
          placeholder="Paste raw invoice text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <button 
        onClick={handleProcess}
        disabled={loading || !inputText}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Agent is processing..." : "Run AI Pipeline"}
      </button>

      {result && (
        <div className={`mt-8 p-6 rounded border ${result.status === 'APPROVED' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <h2 className="text-xl font-semibold mb-2">
            Status: {result.status.replace(/_/g, ' ')}
          </h2>
          {result.reason && <p className="text-sm text-gray-700 mb-4">Note: {result.reason}</p>}
          
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>

          {result.status === 'PENDING_HUMAN_REVIEW' && (
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
              Acknowledge & Manually Approve
            </button>
          )}
        </div>
      )}
    </div>
  );
}