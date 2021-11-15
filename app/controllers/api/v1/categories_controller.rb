class Api::V1::CategoriesController < Api::V1::ApiController
  before_action :set_category, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    categories = Category.all
    render json: categories
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    category = Category.create!(category_params)
    render json: category
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
      params.require(:category).permit(:name).merge(quiz_ids: params[:quiz_ids])
    end
end
