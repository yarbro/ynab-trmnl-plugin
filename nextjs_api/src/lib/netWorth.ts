import * as ynab from "ynab";
import { formatMoney } from "@/lib/moneyFormatter";

export async function getNetWorth(ynab: ynab.API, budgetId: string): Promise<string> {
  const accountsResponse = await ynab.accounts.getAccounts(budgetId);
  const accounts = accountsResponse.data.accounts ?? [];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return formatMoney(totalBalance);
}
