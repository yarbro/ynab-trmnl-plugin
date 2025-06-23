module YnabTrmnl
  class CategorySummaryService
    def initialize(budget_id:, category_slugs:, categories:)
      @budget_id = budget_id
      @category_slugs = category_slugs
      @categories = categories
    end

    def call
      category_slugs.map do |slug|
        category = categories.find { |c| c.name.strip.casecmp?(slug.strip) }
        raise YnabTrmnl::Errors::InvalidCategoryError, "Invalid category: #{slug}" unless category

        month_data = ynab.categories.get_month_category_by_id(
          budget_id,
          Date.today.strftime("%Y-%m-01"),
          category.id
        ).data.category

        [
          category.name,
          {
            budgeted: YnabTrmnl::MoneyFormatter.format(month_data.budgeted),
            activity: YnabTrmnl::MoneyFormatter.format(month_data.activity),
            available: YnabTrmnl::MoneyFormatter.format(month_data.balance)
          }
        ]
      end.to_h
    end

    private

    attr_reader :budget_id, :category_slugs, :categories

    def ynab
      @ynab ||= YNAB::API.new(ENV["YNAB_ACCESS_TOKEN"])
    end
  end
end
