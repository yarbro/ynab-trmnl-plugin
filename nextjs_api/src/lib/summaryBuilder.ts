import { getNetWorth } from "@/lib/netWorth";
import { getUnapprovedCount } from "@/lib/unapprovedTransactions";
import { getCategorySummaries } from "@/lib/categorySummary";

type SummaryResult = {
  net_worth: string;
  unapproved_count: number;
  categories: Record<string, {
    budgeted: string;
    activity: string;
    available: string;
  }>;
};

export async function buildSummary(budgetId: string, categorySlugs: string[]): Promise<SummaryResult> {
  const [netWorth, unapprovedCount, categorySummaries] = await Promise.all([
    getNetWorth(budgetId),
    getUnapprovedCount(budgetId),
    getCategorySummaries(budgetId, categorySlugs),
  ]);

  return {
    net_worth: netWorth,
    unapproved_count: unapprovedCount,
    categories: categorySummaries,
  };
}
