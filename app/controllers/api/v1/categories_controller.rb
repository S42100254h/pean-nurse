class Api::V1::CategoriesController < Api::V1::ApiController
  before_action :set_category, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    if params[:quiz_id]
      quiz = Quiz.find(params[:quiz_id])
      categories = quiz.categories
    else
      categories = Category.all
    end
    render json: categories
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    if params[:title] && params[:caption] && params[:image] && params[:uid]
      ActiveRecord::Base.transaction do
        category = Category.create!(category_params)
        category_profile = category.create_with_category_profile(params[:title], params[:caption], params[:image], params[:uid])
        render json: { category: category, category_profile: category_profile }
      end
    else
      # enable to create Only category without category_profile
      category = Category.create!(category_params)
      render json: category
    end
  end

  def update
    @category.update!(category_params)
    render json: @category
  end

  def destroy
    @category.destroy!
    render json: @category
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.permit(:name).merge(quiz_ids: params[:quiz_ids])
    end
end
