import { getYnabClient } from "@/lib/ynabClient";

export async function getBudgetName(budgetId: string): Promise<string> {
  const ynab = getYnabClient();

  const response = await ynab.budgets.getBudgetById(budgetId);

  return response.data.budget.name;
}
