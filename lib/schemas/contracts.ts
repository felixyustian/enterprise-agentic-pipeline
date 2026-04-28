import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export const DocumentExtractionSchema = z.object({
  entityName: z.string().describe("The legal name of the vendor or entity"),
  totalAmount: z.number().describe("Total amount to be processed, formatted as a float"),
  taxId: z.string().nullable().describe("Tax Identification Number, if present"),
  confidenceScore: z.number().min(0).max(1).describe("Internal model confidence in this extraction"),
  requiresHumanReview: z.boolean().describe("Flag true if the document is highly ambiguous")
});

export const documentFormat = zodResponseFormat(DocumentExtractionSchema, "document_extraction");
export type DocumentData = z.infer<typeof DocumentExtractionSchema>;

export type PipelineResponse = {
  status: "APPROVED" | "PENDING_HUMAN_REVIEW" | "ERROR";
  data?: DocumentData;
  reason?: string;
};