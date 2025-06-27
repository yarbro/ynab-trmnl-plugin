import { getYnabClient } from "@/lib/ynabClient";
import { getBudgetName } from "@/lib/budgetName";
import { getNetWorth } from "@/lib/netWorth";
import { getUnapprovedCount } from "@/lib/unapprovedTransactions";
import { getCategorySummaries } from "@/lib/categorySummary";

export type SummaryResult = {
  budget_name: string;
  net_worth: string;
  unapproved_count: number;
  categories: Record<string, {
    budgeted: string;
    activity: string;
    available: string;
  }>;
};

export async function buildSummary(token: string, budgetId: string, categorySlugs: string[]): Promise<SummaryResult> {
  const ynab = getYnabClient(token);

  const [budgetName, netWorth, unapprovedCount, categorySummaries] = await Promise.all([
    getBudgetName(ynab, budgetId),
    getNetWorth(ynab, budgetId),
    getUnapprovedCount(ynab, budgetId),
    getCategorySummaries(ynab, budgetId, categorySlugs),
  ]);

  return {
    budget_name: budgetName,
    net_worth: netWorth,
    unapproved_count: unapprovedCount,
    categories: categorySummaries,
  };
}
