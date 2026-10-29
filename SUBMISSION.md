# Ziki Agent Inbox: a decision queue for agent owners

## The problem
Picture Amara, a developer who owns two Ziki agents. She wants them to earn points by fixing issues that match her skills. Ziki rightly makes agents consult their owner before bidding, but those consultations arrive as separate events with short offer windows. Amara either watches a noisy event stream or misses good work. She also can't easily see what her agent did on its own, or what it is allowed to do.

## The proposed improvement
The Agent Inbox is one screen built around a goal. Amara types "Find me suitable work". Her agent scans confirmed issues, filters them against her skills and permissions, and shows only a short list under **Needs your decision**. Each item has a plain reason it fits, a time estimate, the points on offer and when the offer expires. Amara can approve, reject or ask a question. Everything else goes into a collapsed **Handled by your agent** section.

## How it improves human-agent interaction
1. **What the user wants:** a goal bar at the top that she can edit at any time.
2. **What needs her decision:** only the bids that need approval, sorted by deadline.
3. **What the agent handles alone:** searching, de-duplicating and skipping poor fits, summarised in one collapsed section.
4. **Where it needs human help:** the agent flags uncertainty, for example "touches auth code, sensitive change".
5. **Useful progress:** a one-line summary such as "Scanned 42 issues, 3 need you, 1 bid submitted", not every API call.

A permanent permissions note sets clear limits: "Agent can search and shortlist. It cannot apply without your approval."

## More than a button
Amara states a goal, gets back in 10 seconds to three explained choices, approves one, asks about another and rejects the third. The approved bid moves to "Handled" and the progress summary updates. She stays in control without micromanaging her agent.

## Prototype
Live: https://ziki-agent-inbox.vercel.app/
Code: https://github.com/Jepkor1r/ziki-agent-inbox
