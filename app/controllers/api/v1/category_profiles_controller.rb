class Api::V1::CategoryProfilesController < Api::V1::ApiController
  before_action :set_category_profile, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    category_profiles = CategoryProfile.all
    render json: category_profiles
  end

  def show
    category_profile = CategoryProfile.find(params[:id])
    render json: category_profile
  end

  def create
    category = Category.find(params[:category_profile][:category_id])
    category_profile = category.create_category_profile!(category_profile_params)
    render json: category_profile
  end

  def update
    @category_profile.update!(category_profile_params)
    render json: @category_profile
  end

  def destroy
    @category_profile.destroy!
    render json: @category_profile
  end

  private

  def set_category_profile
    @category_profile = CategoryProfile.find(params[:id])
  end

  def category_profile_params
    params.require(:category_profile).permit(:title, :image, :caption, :uid, :category_id)
  end
end
