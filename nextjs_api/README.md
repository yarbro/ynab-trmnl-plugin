# YNAB TRMNL API

Next.js API that fetches YNAB budget data and formats it for TRMNL.

## Endpoint

### `GET /api/summary`

**Query Parameters:**
- `budget_id` (required) - YNAB budget ID
- `categories` (required) - Comma-separated category names

**Headers:**
- `Authorization: Bearer {YNAB_API_TOKEN}`

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://your-api.vercel.app/api/summary?budget_id=xxx&categories=Groceries,Gas"
```

**Response:**
```json
{
  "budget_name": "My Budget",
  "net_worth": "$12,345.67",
  "unapproved_count": 5,
  "categories": [
    ["Groceries", {
      "budgeted": "$500.00",
      "activity": "-$234.56",
      "available": "$265.44"
    }]
  ]
}
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

Or deploy to your preferred platform.

## Caching

Responses are cached in-memory for 10 minutes per unique combination of:
- API token
- Budget ID
- Category list

## Project Structure

```
src/
├── lib/
│   ├── budgetName.ts              # Fetch budget name
│   ├── categorySummary.ts         # Fetch category balances
│   ├── moneyFormatter.ts          # Format YNAB milliunits
│   ├── netWorth.ts                # Calculate net worth
│   ├── summaryBuilder.ts          # Orchestrate data fetching
│   ├── unapprovedTransactions.ts  # Number of unapproved transactions
│   └── ynabClient.ts              # YNAB API client
└── pages/api/
    └── summary.ts                 # Main endpoint
```
