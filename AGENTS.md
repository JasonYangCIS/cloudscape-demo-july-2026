# Agent instructions

This repo is the starting point for a Builder.io & AWS workshop. Attendees build two things,
in order:

1. A **code commits dashboard** on the homepage (`src/pages/index`) from a Figma export, using
   this codebase's existing Cloudscape patterns.
2. A **custom theme** applied on top of that same dashboard's Cloudscape components, using
   Cloudscape runtime theming: `import { applyTheme } from '@cloudscape-design/components/theming'`.
   That API is backed by `@cloudscape-design/theming-runtime`, already installed as a dependency
   of `@cloudscape-design/components` — do not `npm install` anything extra for this. This is a
   styling/branding pass, not a rewrite: don't swap out Cloudscape components or replicate their
   markup by hand, apply a theme over the existing ones.

## Mock data — use what already exists, don't invent new data

- The commits dataset already exists at `src/resources/commits.json` (72 mock commits across
  5 repos, 8 authors, `main`/`develop`/feature branches, spanning the last 12 days). Use it as-is.
- Its TypeScript shape is `Commit` in `src/fake-server/types.ts`. Import that type instead of
  redefining the shape inline.
- Load it the same way every other page in this repo loads static resources — via
  `DataProvider` (`src/pages/commons/data-provider.ts`):

  ```ts
  import { Commit } from '../../fake-server/types';
  import DataProvider from '../commons/data-provider';

  new DataProvider().getDataWithDates<Commit>('commits').then(commits => {
    // render with `commits`
  });
  ```

  `getDataWithDates` fetches `./resources/commits.json` and parses the `date` field into a
  real `Date`. Do not `fetch('/commits.json')` or hardcode a different path.
- The data is intentionally flat/denormalized (not GitHub's real API shape) so it binds
  directly to a Cloudscape `Table` and chart series without extra unwrapping.
- Derive chart series (commits per day, commits per repo/author, etc.) from this dataset at
  render time — don't hardcode chart data points. See
  `src/pages/dashboard/widgets/network-traffic` and `.../operational-metrics/chart.tsx` for the
  existing pattern of computing `CartesianChart` series from underlying data.
- If the dashboard needs a field that isn't in `commits.json` (e.g. a new status value), add it
  to the existing JSON file and the `Commit` type — don't create a second, parallel dataset.

## Page structure

- The homepage (`src/pages/index`) is currently a plain workshop intro page (`IntroContent` in
  `src/pages/index/root.tsx`) — a welcome message and instructions, no dashboard yet. It is the
  intended attachment point for the Figma design: replace/extend `IntroContent` with the actual
  commits dashboard (charts + table) rather than starting a new page.
- The full catalog of other Cloudscape demo patterns is listed at `/examples.html` (see
  `scripts/generate-html-files.js` and `examples-list.json`) — check there before building a
  component from scratch, since Cloudscape components used elsewhere.
- `src/pages/table/root.tsx` is a good reference for the full-page table + header + pagination
  shell if the dashboard needs a table below the charts.
