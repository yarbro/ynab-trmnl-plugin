import { getYnabClient } from "@/lib/ynabClient";

export async function getUncategorizedCount(budgetId: string): Promise<number> {
  const ynab = getYnabClient();

  const response = await ynab.transactions.getTransactions(budgetId);
  const transactions = response.data.transactions ?? [];

  const uncategorized = transactions.filter((tx) => tx.category_id === null);

  return uncategorized.length;
}
