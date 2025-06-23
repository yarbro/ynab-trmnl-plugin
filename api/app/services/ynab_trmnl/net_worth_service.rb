module YnabTrmnl
  class NetWorthService
    def initialize(accounts:)
      @accounts = accounts
    end

    def call
      MoneyFormatter.format(accounts.sum(&:balance))
    end

    private

    attr_reader :accounts
  end
end
