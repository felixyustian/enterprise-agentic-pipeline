import { NextResponse } from 'next/server';
import { runAgenticPipeline } from '@/lib/agents/orchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantId, documentText } = body;

    if (!documentText) {
      return NextResponse.json({ error: "Missing document text" }, { status: 400 });
    }

    // Trigger the agentic pipeline
    const result = await runAgenticPipeline(tenantId || "default-tenant", documentText);
    
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}