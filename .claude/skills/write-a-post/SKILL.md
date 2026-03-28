---
name: write-a-post
description: |
  Writes a LinkedIn post in Jakub's authentic voice for building-in-public
  and learning-in-public content. Use whenever Jakub says "post", "posta",
  "napisz posta", "linkedin", "write a post", "building in public",
  "learning in public", wants to share something he learned or built,
  mentions sharing progress, or asks what to post about. Also trigger when
  Jakub shares a video/article and wants to write about it, or after a
  session when he wants to document what he did. Even casual mentions like
  "moze warto napisac" or "powinienem to wrzucic" should trigger this skill.
argument-hint: "[topic, or 'suggest' to get ideas from recent sessions]"
---

# LinkedIn Post Writer

Write a LinkedIn post that sounds like Jakub actually wrote it. His posts are casual, short, direct. He shares what he's doing and learning, not advice or hot takes.

## Step 1: Get the topic

**If argument is "suggest" or empty:**
- Read the last 2-3 session logs from `docs/sessions/`
- Read sekcje "Słabości — update" z ostatnich session logów w `docs/sessions/`
- Propose 3 post ideas based on what Jakub learned recently
- Wait for him to pick one or give his own
- Do NOT write yet

**If argument is a topic (with or without raw thoughts):**
- If Jakub already included his thoughts/bullet points with the topic, skip Step 3
- If it's just a topic with no thoughts, go to Step 3

## Step 2: Load context

- Read `docs/linkedin-posts/style-reference.md` for voice and reference posts
- Read `docs/linkedin-posts/feedback-log.md` if it exists (past corrections from Jakub)
- If topic relates to learning/IRONLOG: read relevant session logs from `docs/sessions/`
- Read any previously published posts in `docs/linkedin-posts/` to avoid repeating yourself

## Step 3: Ask for raw thoughts

Ask Jakub (in Polish): "Co chcesz powiedziec w tym poscie? Daj bullet pointy, mysli, co Cie zaskoczylo. Nie musisz pisac ladnie."

Wait for input. Every opinion and insight in the post must come from Jakub. You structure and polish, you don't invent experiences or takes.

## Step 4: Write the draft

### Voice rules

Read `docs/linkedin-posts/style-reference.md` and match it exactly. The core principles:

- English by default (unless Jakub says Polish)
- Simple vocabulary — he's not a native speaker and doesn't pretend to be
- Short sentences, short paragraphs (1-3 sentences each)
- Casual, direct, no corporate speak
- He's a mid-level dev sharing what he's learning, not giving expert advice
- Drop subjects sometimes ("Not faster, but...", "Next up:")
- Links go in comments (👇 or "link in comments")
- Use 👉 as directional indicators on key middle paragraphs (not on hook or closer). This breaks up the wall of text and guides the eye. See React re-renders reference post for pattern. Don't overdo it — 2-4 per post max

### Content rules

- Open with what he did or found, not with a clickbait hook or question
- Hook must be sharp and concrete — use specific numbers or facts, not vague statements.
  Bad: "I've been using Prisma for a while and never really thought about what happens underneath"
  Good: "I used Prisma for 2 years without writing a single SQL query."
  The difference: concrete ("2 years", "single SQL query") + slightly provocative > vague + descriptive
- Show growth and honest process, not polished results
- Don't expose specific knowledge gaps that look bad to recruiters (e.g. "I didn't know SQL")
  — instead frame as growth ("I understand concepts I used to just skim over")
- Include at least one concrete micro-story instead of staying abstract the whole post.
  Bad: "I started learning SQL and it helped me understand my ORM better"
  Good: "I wrote DELETE on a workout log and watched CASCADE wipe the exercises and sets with it. Turns out that's not Prisma doing something clever, that's just PostgreSQL."
  One specific moment is more memorable and believable than general claims
- Don't enumerate concepts like a textbook ("1NF, 2NF, 3NF"). Show what the concept did for you in practice, or compress to one sentence without listing labels
- Don't introduce topics as afterthoughts ("X helped too"). Weave them into the narrative — start from what you discovered, then name the concept at the end if needed. Bad: "Normalization helped too. There are rules and my schemas make more sense." Good: "Once I saw how tables actually relate, I stopped duplicating data that should've been a foreign key. Turns out there's a name for that, normalization."
- Generic outcomes kill credibility. Replace "my schemas make more sense" with concrete actions: "I stopped duplicating data across three tables", "I knew exactly which JOIN to use". What did you START or STOP doing?
- Closer should echo the hook for thematic closure. If the hook mentions Prisma/ORM, the closer should land on the same concept. This creates a "klamra" — the reader feels the post is complete, not just cut off
- Credit sources when sharing videos/articles/courses
- No hashtags unless Jakub asks
- Keep it 6-12 sentences. When in doubt, shorter.

### Post type patterns

Jakub's posts tend to fall into a few categories. Match the structure to the type:

**"I built/did X"** — what he did, what was tricky, what he learned, what's next
(Example pattern: VPS portfolio post)

**"I learned X"** — what he used to think, what changed, why it matters to him
(Example pattern: React re-renders post)

**"I watched/read X"** — one line about the source, what stood out to HIM, his own take or what he's doing differently now, link in comments
(Example pattern: Claude Code reverse engineering post)

**"Building in public update"** — what he's working on, how he's doing it differently, what surprised him, honest progress

### Anti-AI audit

Before showing the draft, check it against the full humanizer skill at `.claude/skills/humanizer/SKILL.md`. Specifically scan for and fix:

- AI vocabulary (additionally, delve, foster, enhance, landscape, showcase)
- Significance inflation (testament, pivotal, transformative)
- Em dashes (use commas or periods)
- Rule of three patterns
- Negative parallelisms (it's not just X, it's Y)
- Generic positive conclusions
- Filler phrases (in order to, it is important to note)
- Overly clean structure (hook → problem → solution → CTA) — also check if each paragraph does exactly one predictable job (sign of assembled text, not written text)
- Same-length sentences in a row
- Copula avoidance (serves as → is)
- "I" monotony — if most sentences start with "I", restructure some. Drop subjects ("Picked up normalization too."), use passive constructions, or lead with the object ("My schemas got cleaner")
- Clichéd phrases that sound smart but say nothing: "it works, until it doesn't", "the rest is history", "and that's OK". If you've seen it in 100 LinkedIn posts, rewrite it
- Slogan-y closers that sound like motivational posters: "tools change, fundamentals don't". Better: personal opinion with "I" ("I'd rather know what my tools do than hope they're right") — closers should sound like Jakub talking, not a bumper sticker

Then read it one more time and ask: "Would Jakub actually type this?" If any sentence feels too polished or too clever, simplify it.

## Step 5: Iterate

Jakub gives feedback, you adjust. Repeat until he's happy. Pay attention to what he changes — these are signals about his voice that the style reference might not capture yet.

## Step 6: Save and learn

When Jakub approves (says "ok", "good", "leci", "publikuje", "wrzucam"):

1. Save to `docs/linkedin-posts/YYYY-MM-DD-[slug].md`:
```
# [Topic]
Date: YYYY-MM-DD
Language: en/pl

## Final version
[the approved post]

## Draft v1
[your first draft, for comparison]

## Topic source
[what inspired it: session log, video, idea]
```

2. Compare final vs first draft. If Jakub changed things:
   - Figure out the pattern (not just "changed word X to Y" but WHY — was it too formal? too long? wrong tone?)
   - Append to `docs/linkedin-posts/feedback-log.md`:
     `- YYYY-MM-DD: [pattern observed, e.g. "Jakub cut the last paragraph — closing was too preachy"]`
   - If the pattern reveals something missing from `style-reference.md`, update it

## What this skill is NOT

- Not thought leadership. Not advice. Not motivation.
- Not a ghostwriter that invents experiences. Every insight comes from Jakub.
- Not a content machine. Quality over quantity. If there's nothing worth posting, say so.
