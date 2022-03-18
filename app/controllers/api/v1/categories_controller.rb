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
    category = Category.create!(category_params)
    render json: category
  end

  def update
    category_items = category_params
    category_items.delete(:image) if !uploaded_file?
    @category.update!(category_items)
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
      params.permit(:name, :image, :caption, :uid).merge(quiz_ids: params[:quiz_ids])
    end

    def uploaded_file?
      params[:image].instance_of?(ActionDispatch::Http::UploadedFile)
    end
end
