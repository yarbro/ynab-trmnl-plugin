import { formatMoney } from "@/lib/moneyFormatter";
import { getYnabClient } from "@/lib/ynabClient";

export async function getNetWorth(budgetId: string): Promise<string> {
  const ynab = getYnabClient();

  const accountsResponse = await ynab.accounts.getAccounts(budgetId);
  const accounts = accountsResponse.data.accounts ?? [];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return formatMoney(totalBalance);
}
