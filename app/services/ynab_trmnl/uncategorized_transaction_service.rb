module YnabTrmnl
  class UncategorizedTransactionService
    def initialize(transactions:)
      @transactions = transactions
    end

    def call
      transactions.count
    end

    private

    attr_reader :transactions
  end
end
