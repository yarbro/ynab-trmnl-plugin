import { getYnabClient } from "@/lib/ynabClient";
import { formatMoney } from "@/lib/moneyFormatter";

export async function getCategorySummaries(
  budgetId: string,
  slugs: string[]
): Promise<Record<string, { budgeted: string; activity: string; available: string }>> {
  const ynab = getYnabClient();

  const month = new Date().toISOString().slice(0, 7);
  const categoriesResponse = await ynab.categories.getCategories(budgetId);
  const allCategories = categoriesResponse.data.category_groups.flatMap((group) => group.categories ?? []);

  const result: Record<string, any> = {};

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
