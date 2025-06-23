class SummaryController < ApplicationController
  def show
    summary = SummaryService.new(
      budget_id: summary_params[:budget_id],
      category_slugs: summary_params[:categories]
    ).call

    render json: summary
  end

  rescue_from ActionController::BadRequest do |e|
    render json: { error: e.message }, status: :bad_request
  end

  rescue_from YnabTrmnl::Errors::UnauthorizedError do |e|
    render json: { message: e.message }, status: :unauthorized
  end

  rescue_from YnabTrmnl::Errors::InvalidCategoryError do |e|
    render json: { message: e.message }, status: :bad_request
  end

  rescue_from YnabTrmnl::Errors::BudgetNotFoundError do |e|
    render json: { message: e.message }, status: :bad_request
  end

  rescue_from YnabTrmnl::Errors::ApiFailure do |e|
    render json: { message: e.message }, status: :internal_server_error
  end

  private

  def summary_params
    permitted = params.permit(:budget_id, :categories)

    raise ActionController::BadRequest, "Missing budget_id" if permitted[:budget_id].blank?

    {
      budget_id: permitted[:budget_id],
      categories: permitted[:categories].to_s.split(",")
    }
  end
end
