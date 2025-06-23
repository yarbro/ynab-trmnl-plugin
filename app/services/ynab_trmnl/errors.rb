module YnabTrmnl
  module Errors
    class BaseError < StandardError; end

    class InvalidCategoryError < BaseError; end
    class UnauthorizedError < BaseError; end
    class BudgetNotFoundError < BaseError; end
    class ApiFailure < BaseError; end
  end
end
