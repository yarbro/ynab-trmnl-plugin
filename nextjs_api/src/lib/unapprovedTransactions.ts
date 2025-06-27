import * as ynab from "ynab";
import { GetTransactionsTypeEnum } from "ynab";

export async function getUnapprovedCount(ynab: ynab.API, budgetId: string): Promise<number> {
  const response = await ynab.transactions.getTransactions(
    budgetId,
    undefined, // no since_date
    GetTransactionsTypeEnum.Unapproved
  );

  const transactions = response.data.transactions ?? [];

  return transactions.length;
}
