# Food Tracker

A personal calorie and macro log. The user logs what they eat by scanning a barcode, photographing a nutrition label, or picking a saved product.

## Language

### Food

**Product**:
A food item the app remembers, with its Nutrition Facts per 100 g or per 100 ml. It comes from a Barcode Scan or a Label Photo. A barcode is optional.
_Avoid_: Food item, ingredient, article

**Nutrition Facts**:
The nutrient values of a Product per 100 g or ml: kcal, protein, carbs, fat, and any other values on the label.
_Avoid_: Nutriments, nutrition info

**Macros**:
Protein, carbs and fat, in grams.
_Avoid_: Macronutrients, nutrients

**Serving**:
A Product's own portion unit as stated by the maker, such as "1 serving = 30 g".
_Avoid_: Portion (when you mean the maker's unit)

**Package**:
The full contents of one pack of a Product, with a known net weight or volume.
_Avoid_: Container, pack

### Capturing

**Barcode Scan**:
Reading a Product's EAN or UPC code to look up its Nutrition Facts.

**Label Photo**:
A photo of the nutrition table on a Product's packaging, read into Nutrition Facts. The user always reviews the values before saving, and the photo stays with the Product.
_Avoid_: Label scan, OCR scan

**Meal Photo**:
A photo of a plate of food with no label, used to estimate food and portion. Not in scope yet.
_Avoid_: Food photo

### Logging

**Portion**:
How much of a Product the user ate, given in grams or ml, Servings, or a fraction of a Package. It always resolves to grams or ml.
_Avoid_: Amount, quantity, serving size

**Log Entry**:
One record of something the user ate, placed in a Meal on a day. It keeps a copy of the Nutrition Facts from the moment it was logged, so later Product edits do not change it.
_Avoid_: Food entry, log item, diary entry

**Quick Entry**:
A Log Entry with kcal (and optional Macros) typed in by hand, not linked to a Product.
_Avoid_: Manual entry, custom food

**Meal**:
One of four fixed groups for Log Entries in a day: breakfast, lunch, dinner or snacks.
_Avoid_: Meal slot, eating occasion

**Daily Goal**:
The kcal and Macros targets the user sets by hand. Each Daily Goal starts on a date and applies until the next one starts, so past days keep the goal they had.
_Avoid_: Budget, target, TDEE

**Recipe**:
A saved combination of Products, such as a homemade sauce. Not in scope yet. For now, the user logs each Product in the dish as a separate Log Entry.
