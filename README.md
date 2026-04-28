# Enterprise Agentic Pipeline: HITL Operations 🚀

## About The Repository
This repository contains a production-grade, web-ready Agentic AI pipeline built with Next.js, TypeScript, and GPT-4o. It is designed as a foundational template for automating stateful, multi-step business workflows—specifically focusing on document extraction, data structuring, and operational compliance.

This project implements a rigorous, systems-level approach to LLM orchestration. It enforces structured outputs to eliminate hallucinations on critical data and features an autonomous confidence-scoring mechanism that routes edge cases to a Human-in-the-Loop (HITL) dashboard.

### Core System Design Principles
* **Zero Abstraction Orchestration:** Direct integration with the OpenAI SDK to maintain absolute control over tool calling, prompts, and context windows.
* **Structured Output Enforcement:** Utilizes **Zod** schemas as strict API contracts to guarantee the LLM returns predictable, typed JSON.
* **Deterministic Fallbacks (HITL):** The agent calculates its own confidence score. If the score falls below a defined threshold (`0.92`), or if the document is ambiguous, the pipeline suspends autonomous action and flags the payload for manual human review.
* **Multi-Tenant Context (RAG):** Simulates a Retrieval-Augmented Generation pipeline where agentic reasoning is grounded in isolated, per-tenant business rules.

---

## Tech Stack
* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **AI Provider:** [OpenAI (GPT-4o)](https://platform.openai.com/)
* **Data Validation:** [Zod](https://zod.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## Repository Architecture

```text
enterprise-agentic-pipeline/
├── app/
│   ├── api/
│   │   └── process-document/
│   │       └── route.ts         # Serverless API: Bridges the React UI to the Agent
│   ├── page.tsx                 # Frontend: Dashboard for upload and HITL review
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── agents/
│   │   └── orchestrator.ts      # Backend: GPT-4o multi-step reasoning logic
│   ├── rag/
│   │   └── vectorSearch.ts      # Backend: Mocked tenant data retrieval
│   └── schemas/
│       └── contracts.ts         # Shared: Zod schemas for strict JSON enforcement
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* An active OpenAI API key with access to the `gpt-4o` model.

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-username/enterprise-agentic-pipeline.git
   cd enterprise-agentic-pipeline
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Test the Pipeline:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. Paste sample raw document text (e.g., OCR output) into the dashboard to observe the agent extract data, apply business rules, and determine whether to auto-approve or escalate to human review.

---

## Future Roadmap / Areas for Expansion
* **Vector Database Integration:** Replace the mocked RAG retrieval with Pinecone or Qdrant for scalable tenant data indexing.
* **Batch Processing:** Implement `gpt-4o` batch APIs for high-volume, asynchronous, cost-optimized processing.
* **Evaluation Framework:** Add a `jest` or `vitest` regression suite to benchmark pipeline accuracy against edge-case documents.
