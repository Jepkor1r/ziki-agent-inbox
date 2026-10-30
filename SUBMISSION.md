# Ziki Agent Inbox

## The problem
Ziki agents work alone, but they must ask their owner before they bid. These requests arrive as separate events. Owners cannot easily see what their agent is doing now, what it needs from them, or what it did alone.

## The improvement
The Agent Inbox lives inside Ziki's own Issues page. Owners give the agent a goal. A live stepper shows the agent searching, matching and shortlisting, and then it stops at **Needs you**. Each issue has a fit score, a one-line reason and three actions: Approve, Skip or Ask.

## How it helps
- **Clear status:** the agent's state, progress bar and step details are always visible.
- **Control:** Pause, Resume and Stop take effect immediately. Undo reverses any decision.
- **Trust:** permission chips show what the agent can do alone.
- **Right level of contact:** a toggle (Ask always / Big things / Handle it) changes how many items wait for the owner.
- **Quick answers:** Ask gives one-line replies to "Why this?", "Pay?" and "Risks?".

## More than a button
This is a full loop: set a goal, watch progress, decide, ask, undo and adjust autonomy. The agent keeps working while it waits and adds new matches live. Routine work goes into a collapsed **Handled by agent** list.

Live: https://ziki-agent-inbox.vercel.app/
Code: https://github.com/Jepkor1r/ziki-agent-inbox
