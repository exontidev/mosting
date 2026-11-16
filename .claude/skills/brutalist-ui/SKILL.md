---
name: brutalist-ui
description: The app's visual design system — hard-edged brutalist black & white, dark (black) by default. Use whenever building, restyling or reviewing any UI in this repo — pages, layouts, components, forms, buttons, inputs, nav, swap amount/coin/address screens, swap status, QR code screens, loading/error/empty states — or when choosing colors, borders, type, icons or motion.
---

# Brutalist B&W UI

Hard edges, hairline rules, pure black and white, uppercase labels, generous whitespace. Think a printed spec sheet: every element sits on a grid and is bounded by 1px lines, never by shadows or tinted cards. The reference is a product page that pairs a grayscale photo with a single bordered panel: a bold uppercase title row, a full-width rule, a plain description, a control row split by a vertical rule, and a solid black block CTA next to a square outlined icon button.

**Dark is the default.** The page is black with white type and white rules. Light is opt-in, never automatic: `data-theme="light"` on `<html>` (or on any element, to flip only that subtree). Never switch on `prefers-color-scheme`.

## Tokens (defined in `app/globals.css`)

| Class          | Dark      | Light     | Use                                             |
| -------------- | --------- | --------- | ----------------------------------------------- |
| `bg-bg`        | `#000`    | `#fff`    | page and every surface                          |
| `text-fg` / `border-fg` / `bg-fg` | `#fff` | `#000` | text, rules, filled (inverted) blocks |
| `text-muted`   | `#8a8a8a` | `#6b6b6b` | secondary text, placeholders, disabled — **text only** |
| `bg-white` / `bg-black` | fixed | fixed | only for things that must never invert (QR codes) |

Tailwind's default palette, `rounded-*` scale, `shadow-*`, `drop-shadow-*` and `blur-*` are **removed** in `globals.css`, so `bg-zinc-900`, `rounded-lg`, `shadow-md` or `backdrop-blur` produce no CSS at all. The exception is `rounded-full`: Tailwind always generates it, so the reset can't catch it and you have to avoid it yourself. Do not reintroduce them with arbitrary values (`bg-[#1a1a1a]`, `rounded-[6px]`), and do not add colors to the theme.

Because tokens flip with the theme, components need no `dark:`/`light:` variants. If one is truly needed, `dark:` and `light:` follow `data-theme`, not the OS.

## Rules

1. **Two colors.** Black and white. Gray only as `text-muted` for text. No hue anywhere, including errors and success. No opacity-tinted surfaces (`bg-fg/10`), no gradients.
2. **Square corners.** Radius 0 on everything: buttons, inputs, images, badges, avatars, QR frames. No pills, no circles (use squares for dots and markers).
3. **1px solid rules.** `border border-fg` for panels and controls, `border-t border-fg` / `divide-y divide-fg` between sections. Rules run edge to edge inside their panel. Use a thicker rule (2px) only for emphasis states (see Errors).
4. **Flat.** No shadows, glow, blur or glass. Depth comes only from rules and inversion.
5. **Inversion is the accent.** Primary actions, the selected cell, the current step, hover and errors are shown by swapping fg and bg (`bg-fg text-bg`). Nothing else gets emphasis color.
6. **Shared edges.** Adjacent controls touch and share a border (the CTA and the icon button, the stepper and the option group). For cell grids use `grid gap-px bg-fg border border-fg` with `bg-bg` cells, which draws perfect 1px hairlines.
7. **Hard motion.** No transitions or easing. State changes are instant. The only animation allowed is stepped (`steps()`), for example `animate-blink`. Always add `motion-reduce:animate-none`.

## Typography

Geist Sans for UI and Geist Mono for machine strings. Use two weights only: 400 and 700. BBH Bartle (`font-display`, 400 only) is reserved for the `mosting` wordmark. Never use it for headings or body text.

| Role                      | Classes                                                   |
| ------------------------- | --------------------------------------------------------- |
| Wordmark                  | `font-display text-2xl md:text-3xl`. BBH Bartle is caps-only, so `mosting` renders as MOSTING |
| Nav, labels, section heads | `text-xs uppercase tracking-wide` (active nav item: `font-bold`) |
| Buttons                   | `text-sm font-bold uppercase tracking-wide`                |
| Panel title row           | `text-xl font-bold uppercase tracking-tight`, value on the right in `text-xl tabular-nums` |
| Body / descriptions       | `text-sm leading-snug`, sentence case, max ~60ch           |
| Big amounts               | `text-4xl md:text-6xl font-bold tabular-nums tracking-tight` |
| Addresses, tx hashes, memos, IDs | `font-mono text-sm break-all`                      |
| Numbers anywhere          | `tabular-nums`                                             |

Uppercase is for labels, nav, buttons and titles. Body copy and user-entered values keep their case, and addresses always do.

## Components

**Panel.** `border border-fg`, children separated by `divide-y divide-fg`, each section `p-4 md:p-6`.

**Primary button.** Solid block with a hover that inverts to outline:
`h-12 px-6 border border-fg bg-fg text-bg text-sm font-bold uppercase tracking-wide hover:bg-bg hover:text-fg disabled:border-dashed disabled:bg-bg disabled:text-muted disabled:cursor-not-allowed`

**Secondary button.** Outline with a hover that inverts to solid:
`h-12 px-6 border border-fg text-sm font-bold uppercase tracking-wide hover:bg-fg hover:text-bg`

**Icon button.** A square the height of its neighbour: `size-12 grid place-items-center border border-fg hover:bg-fg hover:text-bg`. Put an `aria-label` on it.

**Input.** `h-12 w-full border border-fg bg-bg px-4 text-sm placeholder:text-muted`, with a label above it in `text-xs uppercase tracking-wide`. Address inputs add `font-mono`, `spellCheck={false}` and `autoComplete="off"`.

**Option group.** For inline text options (amount presets, like the 15ML/30ML/60ML row in the reference), the selected option gets `underline underline-offset-4` and the others stay plain. For cell options (coin or chain picker), the selected cell is inverted with `bg-fg text-bg`. Either way, mark the selection with `aria-pressed` or a radio group.

**Stepper.** `[ − ] value [ + ]` in one bordered row, with a vertical rule (`border-l border-fg`) separating it from the next control.

**Header.** `app/_components/header.tsx`, rendered by the root layout on every page. It is a full-width bar with a `border-b border-fg` rule and the wordmark centred. Don't add a second header inside a page.

**Nav.** One row of `text-xs uppercase` links spaced with `gap-8`, the active link `font-bold` (or underlined). Nav links sit on the left and right of the centred wordmark in the header. The wordmark is the single place an expressive face is allowed.

**Images and coin logos.** Use `grayscale object-cover` with no radius, filling their grid cell edge to edge. Logos are always shown in grayscale.

**Icons.** Inline SVG with a 24 viewBox, `fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter"`, at 16 or 20px. Outline style, no filled glyphs, no emoji.

## States

- **Focus.** A global `:focus-visible` gives a 2px `fg` outline with a 2px offset. Never remove it.
- **Error.** No red. The field gets `aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-fg`, which thickens the edge without shifting layout. An inverted strip sits directly under it and shares its edge: `bg-fg text-bg px-4 py-2 text-xs font-bold uppercase` with text like `Invalid address — expected a 0x… EVM address`. Link the strip with `aria-describedby`.
- **Success.** Show it in words with an inverted strip, `Done` / `Confirmed`. No check-mark color.
- **Disabled.** Dashed border, `text-muted`, no hover inversion.
- **Loading.** A blinking block cursor `<span className="animate-blink motion-reduce:animate-none">█</span>`, or a segmented bar of squares. No round spinners.
- **Empty.** An uppercase `text-xs text-muted` line inside the panel. No illustrations.

## Bridge-specific patterns

**QR code.** Always black modules on white, whatever the theme, because scanners can be unreliable with inverted codes. Wrap it in `bg-white p-4 border border-fg` (the padding is the quiet zone) and render it at least 200px. Put the address directly below it in the same panel in `font-mono break-all`, next to a secondary `Copy` button whose label swaps to `Copied` for about 1.5s.

**Swap status.** Show the steps as a bordered `divide-y divide-fg` list, one row per step, with a square marker (`size-3`) in front of the uppercase label:
- done: filled marker `bg-fg`
- current: the whole row is inverted (`bg-fg text-bg`) with a blinking `█`
- pending: outlined marker `border border-fg` and `text-muted` label

Timestamps and tx hashes sit right-aligned in `font-mono text-xs text-muted`.

**Amounts.** The large amount goes in a panel title row, with the ticker in the same size but `font-normal`. Fiat estimates go below it in `text-sm text-muted tabular-nums`.

## Example: panel modelled on the reference

```tsx
<section className="border border-fg">
  <header className="flex items-baseline justify-between p-4 md:p-6">
    <h2 className="text-xl font-bold uppercase tracking-tight">Send BTC</h2>
    <p className="text-xl tabular-nums">0.0500</p>
  </header>
  <div className="border-t border-fg p-4 md:p-6">
    <p className="text-xs uppercase tracking-wide">Deposit address</p>
    <p className="mt-2 font-mono text-sm break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
  </div>
  <div className="flex border-t border-fg">
    <button className="h-12 flex-1 border-r border-fg bg-fg text-bg text-sm font-bold uppercase tracking-wide hover:bg-bg hover:text-fg">
      I&apos;ve sent it
    </button>
    <button aria-label="Copy address" className="grid size-12 place-items-center hover:bg-fg hover:text-bg">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter">
        <rect x="8" y="8" width="12" height="12" /><path d="M16 8V4H4v12h4" />
      </svg>
    </button>
  </div>
</section>
```

## Before calling UI work done

- [ ] No hue, gray surface, radius, shadow, gradient, blur or transition crept in. Grep the diff for `rounded-`, `shadow`, `gradient`, `transition`, `bg-[#`, `text-[#`.
- [ ] It looks right in dark (the default) and with `data-theme="light"`.
- [ ] Labels, nav and buttons are uppercase. Addresses are monospace with their case preserved.
- [ ] Every state (hover, focus, selected, disabled, error, loading) is visible without color.
- [ ] QR codes are black on white with a quiet zone.
