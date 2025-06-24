import { getYnabClient } from "@/lib/ynabClient";
import { GetTransactionsTypeEnum } from "ynab";

export async function getUnapprovedCount(budgetId: string): Promise<number> {
  const ynab = getYnabClient();

  const response = await ynab.transactions.getTransactions(
    budgetId,
    undefined, // no since_date
    GetTransactionsTypeEnum.Unapproved
  );

  const transactions = response.data.transactions ?? [];

  return transactions.length;
}
