# YNAB TRMNL Plugin

A [TRMNL](https://usetrmnl.com/) plugin that displays [YNAB](https://www.ynab.com) budget data on your e-ink display.

> **Note**: Since this codebase deals with sensitive information like your YNAB API key, I've chosen not to create a public TRMNL plugin for this. Instead, you can customize and deploy this yourself to keep your information secure.

## Features

- Display net worth across all accounts
- Show unapproved transaction count
- Monitor selected budget category balances
- Highlight overspent categories
- Multiple layout options (full, half horizontal/vertical, quadrant)

## Setup

### 1. Get YNAB Credentials

- **API Token**: [YNAB Developer Settings](https://app.ynab.com/settings/developer) → New Token
- **Budget ID**: Found in your YNAB URL: `https://app.ynab.com/{BUDGET_ID}/budget`

### 2. Deploy the API

The plugin requires the Next.js API to be deployed and accessible:

```bash
cd nextjs_api
npm install
npm run build

# Deploy to Vercel
vercel

# Or deploy to your preferred platform
```

Your API will be available at a URL like `https://your-project.vercel.app`

### 3. Install Plugin

Import the plugin to your TRMNL account as a private plugin. Configure it with:

- **API Key**: Your YNAB personal access token
- **Budget ID**: Your YNAB budget ID
- **Categories**: Comma-separated category names you want to display (e.g., `Groceries, Gas, Entertainment`)
- **Polling URL**: Update to point to your deployed API endpoint:
  ```
  https://your-project.vercel.app/api/summary?budget_id={{ budget_id }}&categories={{ categories }}
  ```

## Local Development

Create a `.env` file in the project root:

```bash
API_KEY=your_ynab_api_token
BUDGET_ID=your_budget_id
CATEGORIES=Groceries,Gas,Entertainment
```

Start the API:
```bash
cd nextjs_api
npm run dev
```

Start the TRMNL preview:
```bash
gem install trmnl_preview
./bin/dev
```

Preview at `http://localhost:4567`

## Configuration

**Refresh Interval**: Default is 60 minutes (configurable in `src/settings.yml`)

**Cache**: API responses are cached for 10 minutes to respect YNAB rate limits

**Layouts**:
- `full` - All categories
- `half_horizontal` - Top 3 categories
- `half_vertical` - All categories
- `quadrant` - Top 3 categories

## API Response

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

## License

MIT
