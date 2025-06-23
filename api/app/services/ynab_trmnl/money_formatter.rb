module YnabTrmnl
  module MoneyFormatter
    def self.format(milliunits)
      amount = milliunits.to_f / 1000
      ActionController::Base.helpers.number_to_currency(amount)
    end
  end
end
