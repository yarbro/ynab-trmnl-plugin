import * as ynab from "ynab";

export async function getBudgetName(ynab: ynab.API, budgetId: string): Promise<string> {
  const response = await ynab.budgets.getBudgetById(budgetId);

  return response.data.budget.name;
}
