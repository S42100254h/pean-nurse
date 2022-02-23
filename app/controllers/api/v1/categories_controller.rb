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
    if !!(params[:title] && params[:caption] && params[:image] && params[:uid]) == true
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
    if !!(params[:title] && params[:caption] && params[:image] && params[:uid]) == true
      ActiveRecord::Base.transaction do
        @category.update!(category_params)

        if @category.category_profile == nil
          category_profile = @category.create_with_category_profile(params[:title], params[:caption], params[:image], params[:uid])
        else
          category_profile = @category.category_profile
          profile_items = { title: params[:title], caption: params[:caption], uid: params[:uid] }
          # update image only when image is changed
          profile_items[:image] = params[:image] if params[:image].class == ActionDispatch::Http::UploadedFile
          category_profile.update!(profile_items)
        end
        render json: { category: @category, category_profile: category_profile }
      end
    else
      # enable to update Only category without category_profile
      @category.update!(category_params)
      render json: @category
    end
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
