/**
 * Copilot trace types — mirror the backend's TraceEvents.
 */

export type TraceEvent =
  | { type: 'turn_start'; iteration: number }
  | { type: 'thinking'; iteration: number }
  | { type: 'tool_start'; iteration: number; toolCallId: string; name: string; args: unknown }
  | { type: 'tool_end'; iteration: number; toolCallId: string; name: string; durationMs: number; result: unknown; ok: boolean }
  | { type: 'token'; text: string }
  | { type: 'final'; text: string; citations: string[]; iterations: number; totalTokens: number }
  | { type: 'error'; message: string }
  | { type: 'done' };

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  trace?: TraceEvent[];
}

export const COPILOT_API = process.env.NEXT_PUBLIC_COPILOT_API ?? 'http://localhost:4311';

/** POST /copilot/ask and consume the SSE stream, invoking onEvent per trace event. */
export async function askCopilot(
  message: string,
  sessionId: string,
  history: ChatMessage[],
  onEvent: (ev: TraceEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${COPILOT_API}/copilot/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({ message, sessionId, history }),
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') return;
    onEvent({
      type: 'error',
      message: 'Copilot backend is offline right now — it runs on my own infrastructure. Try again later!',
    });
    onEvent({ type: 'done' });
    return;
  }

  if (!res.ok || !res.body) {
    onEvent({ type: 'error', message: `Copilot unreachable (${res.status})` });
    onEvent({ type: 'done' });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) >= 0) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);

      for (const line of raw.split('\n')) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload) continue;
        try {
          onEvent(JSON.parse(payload) as TraceEvent);
        } catch {
          // ignore malformed chunk
        }
      }
    }
  }
}