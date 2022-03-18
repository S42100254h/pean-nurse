class Api::V1::CategoriesController < Api::V1::ApiController
  before_action :set_category, only: [:update, :destroy]
  before_action :set_category_profile, only: [:update]
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
    if category_profile?
      ActiveRecord::Base.transaction do
        @category.update!(category_params)

        if @category_profile.nil?
          @category_profile = @category.create_with_category_profile(params[:title], params[:caption], params[:image], params[:uid])
        else
          profile_items = { title: params[:title], caption: params[:caption], uid: params[:uid] }
          # update image only when image is changed
          profile_items[:image] = params[:image] if uploaded_file?
          @category_profile.update!(profile_items)
        end
        render json: { category: @category, category_profile: @category_profile }
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

    def set_category_profile
      category = Category.find(params[:id])
      @category_profile = category.category_profile
    end

    def category_params
      params.permit(:name, :image, :caption, :uid).merge(quiz_ids: params[:quiz_ids])
    end

    def category_profile?
      !!(params[:title] && params[:caption] && params[:image] && params[:uid])
    end

    def uploaded_file?
      params[:image].instance_of?(ActionDispatch::Http::UploadedFile)
    end
end
