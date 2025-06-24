module YnabTrmnl
  class SummaryBuilder
    def initialize(budget_id:, category_slugs:, data:)
      @budget_id = budget_id
      @category_slugs = category_slugs
      @data = data
    end

    def call
      {
        net_worth: NetWorthService.new(accounts: accounts).call,
        uncategorized_count: UncategorizedTransactionService.new(transactions: transactions).call,
        categories: CategorySummaryService.new(
          budget_id: budget_id,
          category_slugs: category_slugs,
          categories: categories
        ).call
      }
    end

    private

    attr_reader :budget_id, :category_slugs, :data

    def accounts
      data[:accounts]
    end

    def transactions
      data[:transactions]
    end

    def categories
      data[:categories]
    end
  end
end
