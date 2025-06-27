import * as ynab from "ynab";
import { formatMoney } from "@/lib/moneyFormatter";
import { Category } from "ynab";

type CategorySummary = {
  budgeted: string;
  activity: string;
  available: string;
};

export async function getCategorySummaries(
  ynab: ynab.API,
  budgetId: string,
  slugs: string[]
): Promise<Record<string, CategorySummary>> {
  const month = new Date().toISOString().slice(0, 7);
  const categoriesResponse = await ynab.categories.getCategories(budgetId);
  const allCategories: Category[] = categoriesResponse.data.category_groups.flatMap(
    (group) => group.categories ?? []
  );

  const result: Record<string, CategorySummary> = {};

  for (const slug of slugs) {
    const category = allCategories.find(
      (c) => c.name.toLowerCase() === slug.toLowerCase()
    );

    if (!category) continue;

    const monthData = await ynab.categories.getMonthCategoryById(
      budgetId,
      `${month}-01`,
      category.id
    );

    const data = monthData.data.category;
    result[category.name] = {
      budgeted: formatMoney(data.budgeted),
      activity: formatMoney(data.activity),
      available: formatMoney(data.balance),
    };
  }

  return result;
}
