# Product

<!-- impeccable:product-schema 1 -->

## Platform

web — static site, deployed on Vercel

## Stack

Zero build dependencies. Hand-written HTML5, CSS3 and vanilla ES6, served as static
files. No framework, no bundler, no `npm install`. The site is a set of documents; the
only JavaScript is progressive enhancement (clipboard copy, contact form behaviour,
mobile navigation disclosure, and the prototype switcher badge).

## Users

Primary: **Founders and small product teams** looking for a backend engineer to build
an API, wire an LLM into a product, or build a document pipeline. Secondary: technical
peers assessing craft via the source code.

Visitors arrive via direct link, GitHub, or the deployed Vercel URL. They need to
answer three questions in the first screen or two:

1. Can this person actually ship backend work?
2. Is there a real project, with real code, to look at?
3. How do I reach them without a gate?

## Product Purpose

A working portfolio for an independent backend engineer. The primary artefact is
Lectiq — deployed, in use, and open source — which demonstrates the ability to take
an AI feature from idea to production, including the failure handling that separates a
demo from a product.

## Positioning

Backend engineer working in Python and TypeScript. The differentiator is not seniority
or scale; it is shipping AI-backed features that degrade predictably. The site is
written in a restrained editorial register rather than agency marketing language, and
every technical claim on it is traceable to source code.

## Operating Context

Read on desktop and mobile browsers, usually during a hiring or contracting decision.
Maintained as plain files with no framework overhead, so it can be handed to any static
host or moved without a rebuild.

## Capabilities and Constraints

- **Service framing:** four engagement models — API development (FastAPI), Django/DRF
  backends, AI-backed product features, and document/data pipelines. Each maps to an
  `<option>` in the contact form's engagement-model select; the two are kept in sync by
  a shared value list.
- **Direct contact:** email with one-click clipboard copy, a 20-minute intro call, a
  structured project-brief generator that produces a formatted email draft, phone, and
  GitHub.
- **Projects as evidence:** three case studies — Lectiq (deployed), Text Summariser,
  and Gohanbako. Each links to its source.
- **Skills tied to work:** the Index of Practice groups the real stack into three
  domains and links every entry back to the project that demonstrates it.
- **Honesty constraint (load-bearing):** no invented metrics, no client testimonials,
  no claimed seniority. Where a project has a real limitation it is stated in a
  dedicated section. The text summariser's input truncation is documented as a known
  limitation rather than omitted.
- **Claims must be verifiable.** Every technical statement about a project was checked
  against its source before being written. `Task-Brief` is deliberately excluded from
  the case studies: its README describes features the code does not implement.

## Product Principles

- **The work leads.** Projects come before skills; skills are a cross-reference index
  into the work rather than a badge cloud.
- **Honest over impressive.** A documented weakness costs less than a discovered
  fabrication. The site says "available now" rather than implying a schedule it cannot
  guarantee.
- **Frictionless access.** Email, phone, GitHub and a copyable project brief, all
  reachable from the first screen.
- **No build dependencies.** Portable, accessible, and inspectable.

## Known Gaps

- The calendar-booking and Signal/WhatsApp links are unconfigured placeholders.
- `Task-Brief` needs either an implementation pass or a corrected README.
- Several GitHub repositories lack descriptions, topics and a LICENSE; `lectiq`'s
  README is still `create-next-app` boilerplate.
