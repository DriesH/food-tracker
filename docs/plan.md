# Implementation plan

Vocabulary follows `CONTEXT.md`. Decisions follow `docs/adr/`.

## Stack

| Concern | Choice |
|---|---|
| App | Expo SDK 57.0.17+, dev builds, iOS 26+ only |
| Navigation | Expo Router, `unstable-native-tabs` (Liquid Glass, system tint) |
| DB | expo-sqlite + Drizzle ORM 0.45.2 (`useMigrations`, `useLiveQuery`) |
| Camera | react-native-vision-camera 5; barcodes via its iOS Object Output (native, no ML Kit barcode package) |
| OCR | `react-native-vision-camera-ocr-plus` (ML Kit, `PhotoRecognizer`) |
| Styling | Unistyles 3.3.0, `light` + `dark` themes, `adaptiveThemes: true` |
| Native modules | `react-native-nitro-modules` pinned to exactly `0.37.1` |
| Network | Axios + TanStack Query v5 (`onlineManager` + `focusManager` wired) |
| Fonts | Geist + Geist Mono via `expo-font` config plugin |
| Tests | jest-expo for the domain code |

## Folder structure

```
src/
├── app/                    Expo Router routes
│   ├── _layout.tsx         providers + NativeTabs
│   ├── (today)/            Stack: day view, add flow
│   ├── (products)/         Stack: recents, search, all, detail
│   └── (settings)/         Stack: Daily Goal, export
├── domain/                 pure TS, no React, fully tested
│   ├── nutrition.ts        totals, kJ → kcal
│   ├── portion.ts          Portion → grams/ml
│   ├── daily-goal.ts       goal for a date
│   └── label-parser/       OCR blocks → Nutrition Facts
├── db/                     Drizzle schema, client, migrations, queries
├── features/               screens + hooks per feature
│   ├── today/
│   ├── products/
│   ├── capture/            camera, barcode, Label Photo, review
│   ├── goals/
│   └── export/
├── services/
│   └── open-food-facts/    Axios client + mapping to Product
└── ui/
    ├── theme/              tokens: colors, spacing, radii, typography
    └── components/         Typography, Button, Card, ...
```

## Data model

**products**
- `id`, `name`, `brand?`, `barcode?` (unique when set)
- `source`: `off` | `label` | `manual`
- `unit`: `g` | `ml`
- Nutrition Facts per 100: `kcal`, `protein`, `carbs`, `fat`, `sugars?`, `saturatedFat?`, `fibre?`, `salt?`
- `servingSize?`, `servingLabel?` (in `unit`)
- `packageSize?` (in `unit`)
- `labelPhotoPath?`
- `createdAt`, `updatedAt`, `lastUsedAt?`

**log_entries**
- `id`, `date` (`YYYY-MM-DD`), `meal`: `breakfast` | `lunch` | `dinner` | `snacks`
- `productId?` (FK, `ON DELETE SET NULL`), `name` (copy)
- Portion input: `portionKind` (`amount` | `serving` | `package`), `portionValue`, `amount` (resolved g/ml), `unit?`
- Copy of Nutrition Facts per 100, plus `servingSize?` and `packageSize?`. Null for Quick Entry.
- Totals: `kcal`, `protein?`, `carbs?`, `fat?`
- `createdAt`, `updatedAt`

Editing a Portion recalculates the totals from the entry's own copy, never from the Product.

**daily_goals**
- `id`, `startsOn` (unique date), `kcal`, `proteinG`, `carbsG`, `fatG`
- The goal for a day is the row with the latest `startsOn` on or before that day.

## Phases

Each phase ends with something running on the phone.

### 0. Scaffold
- Create the Expo project in this folder, iOS only, `src/app` routes.
- Install the stack with `npx expo install` so react-native-screens stays on the SDK pin.
- Pin Nitro to `0.37.1` (`overrides` / `resolutions`).
- Camera permission in `app.json` by hand (VisionCamera 5 has no config plugin).
- Unistyles: themes, breakpoints, Babel plugin.
- Geist fonts, `Typography` component with variants.
- Providers: QueryClient, SQLite + Drizzle migrations.
- Three native tabs with SF Symbols and empty screens.
- **Done when:** the dev build runs on the iPhone and switches themes with the system.

### 1. Domain core (test-first)
- `portion.ts`: amount, Servings, Package fraction → grams/ml. Package option only when `packageSize` is known.
- `nutrition.ts`: totals from per-100 values; kJ ÷ 4.184.
- `daily-goal.ts`: pick the goal for a date.
- **Done when:** all unit tests pass.

### 2. Today, Quick Entry, Daily Goal
- Day view: date switcher, four Meals, totals against the Daily Goal (kcal + macros remaining).
- Quick Entry form on a Meal.
- Settings: set a Daily Goal (starts today).
- Edit and delete Log Entries.
- **Done when:** you can log a Quick Entry and see what's left for the day.

### 3. Products
- Products tab: recents, search by name, full list with scan date.
- Product detail: edit Nutrition Facts, Serving, Package; delete.
- Log a Product to a Meal with the Portion sheet (g/ml, Servings, ½ / ¼ / custom Package).
- **Done when:** a manually created Product can be logged with all three Portion kinds.

### 4. Barcode Scan
- Camera screen with `useObjectOutput` (EAN-13/8, UPC-A/E).
- Lookup order: local Product → OFF → not found.
- OFF client: API v3, `User-Agent: FoodTracker/<version> (email)`, `fields=` filter, respect 15 req/min.
- Map OFF to a Product and save the copy. Missing kcal → go to Label Photo.
- Offline → offer Label Photo or Quick Entry.
- **Done when:** scanning a Belgian supermarket product logs it in two taps.

### 5. Label Photo
- Take a photo with VisionCamera, compress it, and store it in the app's documents folder.
- OCR with `PhotoRecognizer` → blocks with boxes.
- Label parser: group lines into rows by vertical position; match NL/FR/DE/EN keywords; read the per-100 column; handle decimal commas and kJ/kcal pairs; read Serving when present.
- Build the parser against fixtures: the OCR output of real labels saved as JSON.
- Review screen: photo + form, name required, barcode kept if we came from a failed Barcode Scan, Package size optional.
- **Done when:** 10 real labels parse with at most a few manual fixes each.

### 6. Export
- Export the SQLite file via the iOS share sheet (`expo-sharing`).
- **Done when:** the file opens in a SQLite viewer on the Mac.

## Setup traps

- **Nitro version:** Unistyles and VisionCamera must share one Nitro version. VisionCamera 5.2.3 needs 0.37+ (`nitro-image` uses `ReactProp.hpp`). Unistyles 3.3.0 only sets a minimum (0.35.2).
- **Expo version:** stay on `expo@57.0.17`+ (Reanimated memory problem in earlier 57.x).
- **VisionCamera guides:** v4 guides show a config plugin that v5 doesn't have.
- **OCR on simulator:** `ocr-plus` has no arm64 simulator build. Test Label Photos on the device.
- **Native tabs:** alpha API. Each tab needs its own `Stack` for headers.
- **Drizzle:** `.sql` migrations need Babel (`inline-import`) and Metro (`sql` extension) config.
- **Unistyles 3.3.0:** open iOS crash bug #1243. Check whether it's fixed before release.
- **`pod install` on macOS 27:** the Command Line Tools 27 SDK breaks Xcode 26's linker. Run `SDKROOT=$(xcrun --sdk macosx --show-sdk-path) pod install` in `ios/`.
- **Typography tones:** Unistyles treats a variant named `default` as the fallback, so don't use `default` as a variant value.

## Verify during implementation

- Exact `ocr-plus` `PhotoRecognizer` output shape.
- OFF March 2026 nutrition schema split: which fields to read.
- Native tabs route layout in Expo Router 57.
