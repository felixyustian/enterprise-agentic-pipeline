# Enterprise Agentic Pipeline: Human-in-the-Loop (HITL) Operations

## About The Repository
This repository contains a production-grade, web-ready Agentic AI pipeline built with **Next.js**, **TypeScript**, and **GPT-4o**. It serves as a robust architectural template for automating stateful, multi-step business workflows—specifically engineered for complex document extraction, data structuring, and operational compliance.

Moving beyond basic wrapper implementations, this project demonstrates a rigorous, systems-level approach to LLM orchestration. It guarantees data integrity by strictly enforcing structured outputs to eliminate hallucinations on critical data. Furthermore, it integrates an autonomous confidence-scoring mechanism that intelligently routes edge cases to a Human-in-the-Loop (HITL) dashboard, ensuring system reliability in high-stakes enterprise environments.

### Core System Design Principles
* **Zero Abstraction Orchestration:** Direct integration with the OpenAI API to maintain absolute architectural control over tool calling, prompts, and context windows.
* **Structured Output Enforcement:** Utilizes **Zod** schemas as strict API contracts, forcing the LLM to return predictable, strictly-typed JSON payloads.
* **Deterministic Fallbacks (HITL):** The agent calculates its own confidence score during execution. If the score falls below a defined threshold (`0.92`), or if the input is deemed highly ambiguous, the pipeline suspends autonomous action and flags the payload for manual human review.
* **Multi-Tenant Context (RAG):** Simulates a Retrieval-Augmented Generation pipeline where agentic reasoning is securely grounded in isolated, per-tenant business rules.

---

## Tech Stack
* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **AI Orchestration:** [OpenAI (GPT-4o)](https://platform.openai.com/)
* **Data Validation:** [Zod](https://zod.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## Repository Architecture

```text
enterprise-agentic-pipeline/
├── app/
│   ├── api/process-document/route.ts # Serverless endpoint bridging frontend & AI orchestrator
│   └── page.tsx                      # React Dashboard for document upload & HITL review
├── lib/
│   ├── agents/orchestrator.ts        # Core multi-step reasoning, RAG routing, and LLM calls
│   ├── rag/vectorSearch.ts           # Tenant-isolated business context retrieval logic
│   └── schemas/contracts.ts          # Shared Zod schemas ensuring strict backend/frontend alignment
```

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* An active OpenAI API key with access to the `gpt-4o` model.

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/felixyustian/enterprise-agentic-pipeline.git
   cd enterprise-agentic-pipeline
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and securely add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Test the Pipeline:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. Paste sample raw document text (e.g., OCR output) into the dashboard to observe the agent extract data, apply business rules, and autonomously determine whether to auto-approve the operation or escalate it for human intervention.

---

## Future Roadmap / Areas for Expansion
* **Vector Database Integration:** Replace the mocked RAG retrieval with Pinecone or Qdrant for scalable, multi-tenant data indexing.
* **Batch Processing Pipelines:** Implement `gpt-4o` batch APIs for high-volume, asynchronous, and cost-optimized nightly processing.
* **Evaluation Framework:** Introduce a `jest` or `vitest` regression suite to benchmark agentic accuracy against hundreds of edge-case documents.

## ⚖️ License & Copyright

*   **Implementation Copyright:** © 2026 [Felix Yustian Setiono](https://linkedin.com/in/felixsetiono). The entire system architecture, API source code, and experimental analysis documents within this repository are the original intellectual property of the author.

