# 2080-Hours
Customizable calendar for sharing and printing work shifts, vacations, and unusual shifts for sharing with friends, family, or yourself to hang a postboard/fridge. Vibecoded by Claude™

Check it out[ HERE](https://noman1000.github.io/2080-Hours/)

<img width="1782" height="1253" alt="image" src="https://github.com/user-attachments/assets/baefa0b3-429b-4138-a699-42e912f66f6c" />

<img width="2243" height="1191" alt="image" src="https://github.com/user-attachments/assets/003eb2d3-ef47-4986-aa65-e0e0cd918f65" />


Includes presets and customizability for rotating or fixed schedules and a paycheck estimator with functions for custom rules depending on your company policies for awarded time/OT/etc. It's a single HTML file that runs in any browser, needs no install or account, and keeps all your data in your own browser.

**Use it online:** https://noman1000.github.io/2080-Hours/
**Use it offline:** download `index.html` and double-click it.

## What it does

### Calendar
- Month, Quarter, Year and Shift bid views, with weeks laid out from your pay week's first day with custom pay week start days.
- **Actual** view (with your edits) or **Pattern only** (the plain rotation projected forward).
- Click a day to edit it, or pick a brush and drag across days: Vacation, PTO, Sick, Holiday off, Floating holiday, Banked time off, Training, Field trip, Extra shift / OT, Swap in, Swap out.
- Markers for paydays (red corner), the last day of a shift bid (side bar), holidays (pink), premium holidays (gold ring), and awarded pay or POAD (blue corner).
- Cycle position controls to shift the whole rotation a day earlier or later.
- Totals: paid hours, hours worked, workdays, days off, % of days off, weekend days off, leave and OT hours, holiday and premium holiday hours worked, and, for rotating schedules, long, regular and short weekends plus the longest stretch off.
- Export: print, PNG image, CSV of days, CSV of pay periods.

### Schedule pattern
- Presets: 5/8, rotating 5/8, 4/10, rotating 4/10, rotating 9.5, 9/80, 7 on / 7 off, Pitman 2-2-3, 4 on / 4 off, or a blank cycle.
- Weekly rotation builder where each pay week stands alone and days off move forward or back each week.
- Click-to-edit cycle grid with per-day hours.
- Pay week, pay period length and start date, and payday (day and timing).
- Federal holidays (each can be turned off or marked premium) plus your own one-time or yearly holidays.
- Comparison table of every schedule type for the year.

### Time Off
- Leave banks you name yourself, each with a starting balance, an accrual rate (per year, month, pay period, day, day worked or hour worked), an optional maximum, and the day types that draw from it.
- A chart for each bank showing its balance through the year, when it reaches its maximum, and hours lost to the cap.
- Bank a holiday instead of taking holiday pay, and send POAD time to a bank.
- Apply leave across a date range; list and remove edits.

### Paycheck
- Hourly or salary (with optional salary OT).
- An ordered overtime and premium rules editor: conditions (past normal shift, past N hours, field trip, swap, training, holidays, premium holidays, weekends), combined with "and also," using At least / Add / Set to, with Stop. Includes a live table of what each kind of hour pays.
- Awarded pay items (such as a paid lunch) you tick on any day.
- POAD (pay or a day), full or partial, on OT and training days.
- Per diem, per hour and/or per day, not taxed.
- Deductions as % of gross, % after pre-tax, or flat $, with pre-tax flags.
- Pay stub view for any payday, plus a year table of every check.

### Looks
Classic (old-school teal), Modern (follow system, light or dark) and Night Shift.

## Your data
**Where it's stored:** your schedule, edits, banks, pay settings and styles are saved automatically in your browser's **local storage**, under the key `shiftcal.v1`, as one JSON record. It stays on that device and in that browser only. There's no account, no server, no cookies and no tracking, and your data is never uploaded.

**What that means in practice:**
- Each browser and each address keeps its own copy. The GitHub site, a downloaded `index.html`, and a different browser or computer all start separately.
- Clearing your browser's site data or cookies for the page deletes it, and private/incognito windows don't keep it after you close them.
- To back up or move your setup, use **Save / load → Save backup file** (or **Copy backup text**), then **Load** it on the other side. The backup is the same JSON record in a plain text file.

**Outside connections:** the app makes only two kinds of web requests. The page loads the IBM Plex fonts (used by the Modern and Night Shift looks) from Google Fonts. **Export → Image (PNG)** loads the html2canvas library from cdnjs the first time you use it. Neither one sends your schedule data.

Pay figures are estimates. Tax rates are flat percentages you enter, not real withholding tables.

## License
GNU GPL v3. See [LICENSE](LICENSE).
