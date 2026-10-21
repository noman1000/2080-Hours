# 2080 Hours: notes for Claude Code

2080 Hours is a shift calendar and paycheck estimator for people on rotating or fixed schedules. Live site: https://noman1000.github.io/2080-hours/ (GitHub Pages, deployed from `main`, root folder).

## Hard rules
- **Everything lives in one file, `index.html`.** HTML, CSS and JS are all inline. Don't add a build step, a framework, npm packages or separate files unless the owner asks. It must keep working when someone double-clicks the file offline.
- **The only allowed external loads:** Google Fonts (IBM Plex Sans/Mono), and html2canvas 1.4.1 from cdnjs, loaded lazily by Export → Image. Everything else ships inline.
- **No server, accounts, cookies or tracking.** User data stays in the browser (see State below). The README promises this, so keep it true.
- **Don't break saved data.** Users already have state in `localStorage['shiftcal.v1']`. Any new state field needs a default/migration line near the other `if(S.x==null)S.x=…` lines so older saves keep loading. Never rename or drop existing fields.
- **Keep `[hidden]{display:none!important}` in the CSS.** Dialogs and tabs toggle with `el.hidden`, and without that rule they never hide. That bug happened once already.
- After editing, check the script parses. One quick way: extract the `<script>` block to a temp file and run `node --check` on it. Then open `index.html` in a browser.
- Commit messages: short, imperative, describing the user-visible change. The owner also edits `README.md` on GitHub directly, so always pull before committing.

## Owner's preferences
- The look is deliberately **old school**. "Classic (teal)" mimics a 90s Windows scheduling program: beveled borders, a gradient title bar and fake minimize/maximize/close buttons. Those fake buttons show **only** in Classic.
- Other looks: Modern (follow system / forced light / forced dark) and **Night shift** (the owner likes that name; keep it). Default for new users: Modern, follow system.
- Write copy in plain language for shift workers, not office workers. Holidays land on the **actual date** by default, because rotating-shift workers don't get the observed Friday/Monday. The observed-date rule is an option.
- New-user defaults: 5/8 straight days preset, Mon–Sun pay week, $7.25/h hourly, $15,080/yr salary, all leave banks off, no example edits.
- Days must be distinguishable without relying on color. Every day type has its own bold/italic/line style (`DEFTS`), and users can override colors and text styles in **Day colors & text…**.

## How the code is laid out (inside the one `<script>`)
The whole app is an IIFE with a single state object `S`, saved by `save()` on every `render()`.

- **Dates** are integer day numbers (`dn(y,m,d)` = days since the epoch, UTC). Helpers: `toIso`, `fromIso`, `ymd`, `wd` (0 = Sun), `fmtD`, `fmtH`, `money`, `mod`.
- **Pattern:** `S.pattern` is an array of hours per cycle day (0 = RDO), with `S.anchor` as the ISO date of cycle day 1. `baseH(n)` gives scheduled hours.
- **Weekly rotations** (`S.weekly`): rotating 4/10 and 5/8 and builder-made patterns must stay aligned to pay weeks. `alignWeekly()` runs in `render()`, and `shiftCycle()` rotates days off *within* each week instead of sliding the anchor. A bug where shifting gave 4-off weeks came from ignoring this.
- **Day edits:** `S.edits['YYYY-MM-DD'] = {t, h?, n?, aw?, bank?, poad?, poadH?}`.
  - `t` is a key of `TYPES`: vac, pto, sick, hol, flt, comp, trn, ft, ot, swin, off, rdo, vto, note.
  - `h` overrides hours, `n` is a note, and `aw` is a list of awarded-pay ids.
  - `bank` means a holiday was banked instead of paid at holiday rates.
  - `poad` is `'full'|'partial'` (pay or a day), with `poadH` holding the partial hours.
- **`info(n)`** is the single source of truth for a day: kind, work hours, leave hours/type, OT, VTO, POAD, holiday, premium. Calendar, totals, pay, CSV and banks all read from it. Change behavior there, not in the views.
- **Holidays:** `FED` (federal, `fobs` applies the actual-vs-observed setting), `S.customHols`, `S.fedOff`, `S.fedPrem`. Lookup goes through `hols(y)` (cached in `holCache`, cleared each render), then `holEntry`/`holName`/`holPrem`.
- **Pay periods / paydays:** `S.payWeekStart`, `S.ppLen` (14/7/0), `S.ppAnchor`, `S.payDow`, `S.payWhen`. Helpers: `pwStart`, `ppStart`, `perStart`, `perLen`, `isPayday`, `periodForPayday`, `paydayOf`.
- **Pay engine:** `S.pay` holds the wage or salary (with salary-OT), per diem, `rules`, `awards` and `deds`.
  - `rateAt()` applies the ordered rules editor (At least / Add / Set to, Stop, two conditions from `CONDS`).
  - `dayPay()` splits each day's hours at the rule cut points.
  - `checkFor(periodStart)` builds a full check: earnings buckets, pre-tax and other deductions, per diem (untaxed, added after deductions), and net.
- **Leave banks:** `S.banks[]` holds `{on, name, start, amt, per, max, use[], recv, poad}`. `bankYear()` simulates the year for the balance chart and the time-to-max line.
- **Totals:** `totals(a,b)` and `offRuns()` handle the long/regular/short weekend counts, using `S.longMin`/`S.shortMax`.
- **Views:** `range()` gives the current view's span (month, quarter, year, or shift bid from `S.bids`). `mini()` draws the small months, `big()` draws Month view with the WEEK HRS column from `wkCell()`, and `renderCal()` draws the stats and legend.
- **Tabs:** `renderPattern`, `renderEdits` (the **Time Off** tab, internally `edits`), `renderPay`, `renderData`. Day menu: `openDlg`/`drawTypes`/`drawPoad`/`drawBankBtn`.
- **Styling:** colors are CSS custom properties per skin (`:root`, `.skin-classic`, `.skin-night`, `.skin-light`, `.skin-dark`, plus the prefers-color-scheme block). Day classes are `k-<type>`; brush and legend labels use `ts-<type>`. User overrides go in `S.styles`, written into the `#userStyles` style tag by `applyUserStyles()`. Hidden brushes are listed in `S.brushOff`.
- **Export:** Print uses `@media print` and fits a year on one landscape page; check that it still fits after layout changes. There's also PNG (html2canvas), days CSV and pay-period CSV. The `framed` flag detects a sandboxed iframe preview where downloads and print are blocked.
- **Confirm buttons:** use `armed(button, fn)` (click twice) instead of `confirm()`.
