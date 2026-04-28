import OpenAI from 'openai';
import { documentFormat, DocumentData, PipelineResponse } from '@/lib/schemas/contracts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const AUTO_APPROVE_THRESHOLD = 0.92;

// Mock RAG retrieval function for business context
async function fetchTenantContext(tenantId: string) {
  return `Standard processing rules apply. Ensure tax ID is captured for amounts over $1000.`;
}

export async function runAgenticPipeline(tenantId: string, documentText: string): Promise<PipelineResponse> {
  try {
    const context = await fetchTenantContext(tenantId);

    // 1. Use the STABLE .create() method instead of the .beta.parse() method
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-4o-2024-08-06'
      messages: [
        { 
          role: 'system', 
          content: `You are an autonomous compliance agent. Use the context to extract data accurately. Context: ${context}` 
        },
        { 
          role: 'user', 
          content: `Extract fields from this raw OCR text: ${documentText}` 
        }
      ],
      // 2. We still pass the strict Zod format here
      response_format: documentFormat,
      temperature: 0.0, 
    });

    // 3. Manually parse the JSON string returned by the standard method
    const rawContent = response.choices[0].message.content;
    if (!rawContent) throw new Error("LLM returned empty content.");
    
    const parsedData: DocumentData = JSON.parse(rawContent);

    // Evaluation & Routing Logic
    if (parsedData.requiresHumanReview || parsedData.confidenceScore < AUTO_APPROVE_THRESHOLD) {
      return {
        status: "PENDING_HUMAN_REVIEW",
        reason: `Confidence score (${parsedData.confidenceScore}) below threshold or flagged for ambiguity.`,
        data: parsedData
      };
    }

    return { status: "APPROVED", data: parsedData };

  } catch (error: any) {
    return { status: "ERROR", reason: error.message };
  }
}