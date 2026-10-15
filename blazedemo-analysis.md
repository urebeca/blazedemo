# BlazeDemo.com — Website Analysis (QA Knowledge Base)

> **Site:** https://blazedemo.com
> **Purpose:** Free demo site by BlazeMeter for practicing web testing & test automation.
> **Nature:** Fake data, randomized per session, no real backend (orders are not persisted).
> **Analysis date:** 2026-10-07

---

## 1. Site Structure

| # | Page | URL | Purpose |
|---|------|-----|---------|
| 1 | Home | `/` or `/index.php` | Select departure + destination city, submit |
| 2 | Results | `/reserve.php` | Table of available flights |
| 3 | Purchase | `/purchase.php` | Passenger/payment form, shows total cost |
| 4 | Vacation | `/vacation.html` | Static "destination of the week" page |
| 5 | Home alt | `/home` | Duplicate landing page |

---

## 2. User Flow

```
Home (index.php)
   │  select departure city + destination city → "Find Flights"
   ▼
reserve.php  (flight results table)
   │  click "Choose" on a flight
   ▼
purchase.php (passenger + payment form)
   │  submit form
   ▼
Confirmation / order summary
```

---

## 3. Page Elements

### 3.1 Home (`index.php`)
- **Heading:** "Welcome to the Simple Travel Agency!"
- **Dropdown 1 — Departure city (7 options):**
  Paris, Philadelphia, Boston, Portland, San Diego, Mexico City, São Paolo
- **Dropdown 2 — Destination city (13 options):**
  Buenos Aires, Rome, London, Berlin, New York, Dublin, Cairo
- **Button:** Find Flights
- **Links:** Travel The World (`index.php`), home (`home`), "destination of the week! The Beach!" (`vacation.html`)

### 3.2 Results (`reserve.php`)
- **Heading:** "Flights from [city] to [city]:"
- **Table columns:** Flight #, Airline, Departs, Arrives, Price, (Choose button)
- **Sample data (randomized each query):**

| Flight # | Airline | Departs | Arrives | Price |
|----------|----------------|-----------|-----------|-----------|
| 43 | Virgin America | 1:43 AM | 9:45 PM | $472.56 |
| 234 | United Airlines | 7:43 AM | 10:45 PM | $432.98 |
| 9696 | Aer Lingus | 5:27 AM | 8:22 PM | $200.98 |
| 12 | Virgin America | 11:23 AM | 1:45 PM | $765.32 |
| 4346 | Lufthansa | 1:45 AM | 8:34 PM | $233.98 |

- Each row has a **Choose** button → navigates to `purchase.php`

### 3.3 Purchase (`purchase.php`)
- **Header info:** Airline, Flight Number, Price, "Arbitrary Fees and Taxes", **Total Cost**
- **Price formula:** `Total = Price + Arbitrary Fees and Taxes`
  - Example: `400 + 514.76 = 914.76`
- **Form fields:**
  - Name
  - Address
  - City
  - State
  - Zip Code
  - Card Type (dropdown: Visa, American Express, Diner's Club)
  - Credit Card Number
  - Month / Year (expiry)
  - Name on Card
  - "Remember me" checkbox

### 3.4 Vacation (`vacation.html`)
- Static page: "Destination of the week: Hawaii !" + image (`assets/vacation.jpg`)

---

## 4. Test Observations & Known Quirks

1. **No persistence** — orders/data are not saved; refresh gives new random data.
2. **Randomized flight data** — results differ every query (good for testing dynamic tables, bad for hard-coded assertions).
3. **Header bug** — purchase page shows wrong route (e.g., "Your flight from TLV to SFO" instead of the selected cities).
4. **Broken link** — `reservation.php` returns **404**; the real page is `reserve.php` (common typo trap).
5. **Mixed tech** — some pages use `.php`, others `.html`.
6. **No real validation server-side** — client-side validation can be bypassed.

---

## 5. Suggested Test Cases (Beginner)

### Functional
| ID | Test Case | Expected Result |
|----|-----------|-----------------|
| TC-01 | Select valid departure + destination, click Find Flights | Results table displays with 5+ rows |
| TC-02 | Leave dropdowns on default "Choose", submit | Error message or no navigation |
| TC-03 | Select same city for departure and destination | Defined behavior (error or empty results) |
| TC-04 | Click "Choose" on a flight row | Navigate to purchase page with correct flight details |
| TC-05 | Verify total cost calculation | Total = Price + Fees & Taxes |
| TC-06 | Submit purchase form with valid data | Confirmation page shown |

### Form Validation
| ID | Test Case | Expected Result |
|----|-----------|-----------------|
| TC-07 | Submit purchase form empty | Required-field validation errors |
| TC-08 | Invalid credit card number | Validation error |
| TC-09 | Expired card date (past Month/Year) | Validation error |
| TC-10 | Zip code non-numeric / too long | Validation error |
| TC-11 | Very long strings in Name/Address | Field length limits enforced |
| TC-12 | Special characters / XSS payload in text fields | Input sanitized, no script execution |

### Non-Functional
| ID | Test Case | Expected Result |
|----|-----------|-----------------|
| TC-13 | Broken link check on all pages | All links resolve (expect failure on `reservation.php`) |
| TC-14 | Cross-browser testing (Chrome, Firefox, Edge) | Consistent rendering & behavior |
| TC-15 | Responsive design (mobile/tablet) | Layout adapts, elements usable |
| TC-16 | Page load performance | Pages load < 3s |
| TC-17 | Header route display on purchase page | Should show selected cities (currently buggy) |

---

## 6. Quick Manual Test Script

```
1. Open https://blazedemo.com
2. Select departure: Boston, destination: Rome
3. Click "Find Flights"
4. Verify results table displays with 5+ rows and price column
5. Click 1st flight's "Choose" button
6. Verify purchase page shows flight details
7. Verify Total = Price + Arbitrary Fees and Taxes
8. Submit empty form → expect validation errors
9. Fill valid data → expect confirmation
10. Go back → verify no data persisted
```

---

## 7. Automation Candidates

Good first practice targets for **Selenium / Playwright**:
- Dropdown selection & form submission flow
- Table data validation (flight rows, price format `$X.XX`)
- Total cost calculation assertion
- Required-field validation checks
- Link crawling (broken link detection)

---

*This file serves as a knowledge base reference for QA practice on BlazeDemo.com.*
