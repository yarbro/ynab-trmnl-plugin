module YnabTrmnl
  class DataFetcher
    def initialize(budget_id:)
      @budget_id = budget_id
    end

    def call
      raise YnabTrmnl::Errors::Unauthorized, "Missing YNAB access token" unless ENV["YNAB_ACCESS_TOKEN"].present?

      begin
        {
          accounts: ynab.accounts.get_accounts(budget_id).data.accounts,
          transactions: ynab.transactions.get_transactions(budget_id, type: "unapproved").data.transactions,
          categories: ynab.categories.get_categories(budget_id).data.category_groups.flat_map(&:categories)
        }
      rescue YNAB::Errors::Unauthorized
        raise YnabTrmnl::Errors::UnauthorizedError, "Invalid YNAB access token"
      rescue YNAB::Errors::NotFound
        raise YnabTrmnl::Errors::BudgetNotFoundError, "Invalid budget ID"
      rescue StandardError => e
        raise YnabTrmnl::Errors::ApiFailure, "YNAB API error: #{e.message}"
      end
    end

    private

    attr_reader :budget_id

    def ynab
      @ynab ||= YNAB::API.new(ENV["YNAB_ACCESS_TOKEN"])
    end
  end
end
