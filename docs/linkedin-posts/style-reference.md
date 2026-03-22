# LinkedIn Style Reference

## Voice profile

- Non-native English speaker — simple vocabulary, short sentences, occasional grammar that's slightly off (and that's fine, it's authentic)
- Casual and direct, zero corporate speak
- Shares what he learned or built, never lectures or gives unsolicited advice
- Honest about being mid-level, no fake authority or expertise signaling
- Uses "I" naturally
- Drops subjects sometimes ("Not faster, but...", "Next up:", "Sounds weird to...")
- Genuine enthusiasm without overdoing it ("it's really interesting", "serio polecam", "it felt really good")
- Credits sources — links videos, articles, courses, people by name
- 👇 for links in comments (not every post, but often)
- Mix of English (majority) and Polish posts
- No hashtags or minimal

## Sentence-level patterns

- Connectors he actually uses: "and", "but", "so", simple stuff. No "furthermore", "moreover", "additionally"
- Contractions: "it's", "I'm", "didn't", "doesn't" — always
- Technical terms without explaining them when his audience would know (React.memo, VPS, CLI)
- Sometimes starts sentences with "If you're into...", "If you..." for soft recommendations
- Uses hyphens sparingly, never em dashes

## Structure patterns

- Opens with effect/result, not with source ("Turns out I wasn't learning much" > "I watched a video")
- Body: what happened, what he learned, what surprised him
- Results should be specific and show scale ("built two full modules" > "understand concepts better")
- Closes with: what's next, link in comments, or question to readers
- One moment of honest emotion per post is enough, don't overdo it
- Short paragraphs (1-3 sentences each)
- Total length: 4-8 sentences for simple topics, up to ~15 for complex ones
- Sometimes uses "before/after" framing: "I used to think X. Turns out Y."

## What he does NOT do

- No motivational quotes or inspirational closers
- No "hot takes" or controversial openers for engagement
- No bullet point lists with bold headers
- No "Here's what I learned:" followed by numbered list
- No tagging random people for reach (only tags people he's genuinely thanking)
- No humble bragging
- No "I'm excited to announce" or "Thrilled to share"
- No rule of three patterns
- No em dashes
- No "Let me explain" or "Let's break this down"
- No "Here's why this matters"

## Reference posts

### Post 1 — VPS portfolio (English, "I built X" type)
I just gave my portfolio a brand new look and moved it to my very own VPS.

Last time I shared my portfolio it was hosted on Vercel. This time I wanted to handle everything by myself. Setting up the server, deploying it and all that. It took some work but it felt really good to actually know what is going on behind the scenes.

Next up: adding self-hosted analytics with Umami or Plausible.

Link in comments 👇

### Post 2 — React re-renders (English, "I learned X" type)
I used to think that changing props automatically re-renders a React component.

Spoiler: it doesn't - at least, not directly.

👉 According to this article, React re-renders when state, context, or a parent render changes (among other cases). Props are just the values passed along during that process.

Another great point: without React.memo, children re-render whenever their parent does (even if props didn't change). With React.memo, they only re-render if their props change.

This explanation made React much easier for me to reason about and helps avoid unnecessary renders.

Full article linked in the comments 👇

### Post 3 — Claude Code reverse engineering (English, "I watched X" type)
Just watched someone reverse-engineer Claude Code, and it's really interesting to see how it all comes together

They decompiled the CLI, intercepted API calls, and showed how system prompts + workflows do most of the heavy lifting.

After watching the video, what really stood out to me is why Sonnet 4 performs better in Claude Code than in Cursor. It clearly shows the power of proper prompts, context, and workflows.

If you're into coding agents or AI workflows, this one's definitely worth a watch.

Check out the video below 👇

### Post 4 — AI learning illusion (English, "building in public" type)
See: docs/linkedin-posts/2026-03-22-ai-learning-illusion.md

## Published posts archive

All published posts are saved in `docs/linkedin-posts/` as `YYYY-MM-DD-[slug].md`. Read them before writing new posts to avoid repeating topics and to match evolving voice.
