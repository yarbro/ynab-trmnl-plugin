class SummaryService
  def initialize(budget_id:, category_slugs:)
    @budget_id = budget_id
    @category_slugs = category_slugs
  end

  def call
    cache_key = [ budget_id, category_slugs.sort ].join("-")

    cached_json = Rails.cache.fetch(cache_key, expires_in: 5.minutes) do
      data = YnabTrmnl::DataFetcher.new(budget_id: budget_id).call

      summary = YnabTrmnl::SummaryBuilder.new(
        budget_id: budget_id,
        category_slugs: category_slugs,
        data: data
      ).call

      summary.to_json
    end

    JSON.parse(cached_json)
  end

  private

  attr_reader :budget_id, :category_slugs
end
