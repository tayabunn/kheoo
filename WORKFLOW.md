# KHEOO AI-Assisted Frontend Engineering Workflow Report

## Executive Summary
This document analyzes the engineering workflow progression for the **KHEOO Premium Streetwear E-Commerce Capstone**. It contrasts undirected prompting ("Round 1: Vague Prompting") against structured specification-driven engineering ("Round 2: Prompt Engineering with Verification Loops").

---

## 1. Round 1 vs Round 2 Comparison

| Criteria | Round 1 (Vague Prompting) | Round 2 (Spec-Driven Engineering) |
| :--- | :--- | :--- |
| **Initial Prompt** | *"Add AI to the store."* | *Explicit schema with multi-provider fallback (Groq, Mistral, Gemini, Meta), SSE token streaming, Zod tools (`search_products`, `recommend_size`, `track_order`, `apply_coupon`), and Generative UI component bindings.* |
| **Correctness & Type Safety** | Generic markdown dump, hardcoded responses, no fallback when rate limits hit. | Typed TypeScript contracts, full Zustand store bindings (`useCartStore`, `useQuickViewStore`), resilient multi-engine failover. |
| **Accessibility (A11y)** | Inaccessible streaming tokens, broken screen-reader flow, missing keyboard traps. | `aria-live="polite"` polite token announcements, complete keyboard navigation (`Escape`, `Tab`, `Enter`). |
| **Edge Cases & Failure Handling** | Network dropout or API 429 broke UI without recovery. | Designed 4-stage tool lifecycle (`input-streaming` ➔ `input-ready` ➔ `output-available` ➔ `output-error`), mid-stream abortable Stop button, per-message retry action. |
| **Review & Remediation Effort** | High: required hours of manual refactoring to fix layout shift (CLS), broken state, and API timeouts. | Low: code complied directly, verified through automated contracts and structured validation. |

---

## 2. Concrete AI Mistakes Caught & Rectified
1. **Streaming Markdown Truncation Flicker**: Naive markdown rendering broke when unclosed fences or dangling asterisks were streamed token-by-token. Resolved by buffering token blocks and applying structured parsers.
2. **Auto-Scroll Fighting User Interaction**: Naive `scrollIntoView()` forcibly pulled users down even when they scrolled up to inspect previous drop details. Resolved by implementing bottom-threshold detection (`isAutoScrollEnabled`) and providing a floating `"Jump to latest ↓"` affordance.
3. **Mid-Stream Abort State Corruption**: Aborting requests previously left dangling loading spinners and locked input fields. Resolved by isolating `AbortController` instances and handling `AbortError` cleanly to preserve partial completions.

---

## 3. Project Architectural Rules (Enforced in Repository)
1. **Rule 1 (Streaming Hygiene)**: *All streaming route handlers must return proper Server-Sent Events headers (`text/event-stream`, `no-cache`, `no-transform`) and handle client disconnection via abort signals without leaking connection sockets.*
2. **Rule 2 (Generative UI Contract)**: *AI tools must never render raw JSON payloads directly; each tool execution must resolve to a dedicated, typed interactive UI component with a designed error fallback state.*
3. **Rule 3 (Zero CLS Skeleton Handoff)**: *Pending AI interactions must transition smoothly from thinking indicators into streamed content without layout shift.*
