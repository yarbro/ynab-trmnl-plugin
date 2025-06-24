import { getNetWorth } from "@/lib/netWorth";
import { getUncategorizedCount } from "@/lib/uncategorizedTransactions";
import { getCategorySummaries } from "@/lib/categorySummary";

type SummaryResult = {
  net_worth: string;
  uncategorized_count: number;
  categories: Record<string, {
    budgeted: string;
    activity: string;
    available: string;
  }>;
};

export async function buildSummary(budgetId: string, categorySlugs: string[]): Promise<SummaryResult> {
  const [netWorth, uncategorizedCount, categorySummaries] = await Promise.all([
    getNetWorth(budgetId),
    getUncategorizedCount(budgetId),
    getCategorySummaries(budgetId, categorySlugs),
  ]);

  return {
    net_worth: netWorth,
    uncategorized_count: uncategorizedCount,
    categories: categorySummaries,
  };
}
