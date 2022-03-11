class Api::V1::BadgesController < Api::V1::ApiController
  before_action :set_badge, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  def index
    badges = Badge.all
    render json: badges
  end

  def show
    badge = Badge.find(params[:id])
    render json: badge
  end

  def create
    if Badge.find_by(index: badge_params[:index], category_id: params[:category_id])
      badge = Badge.find_by(index: badge_params[:index], category_id: params[:category_id])
      current_user.update_badge_color(badge)
    else
      badge = current_user.badges.create!(badge_params.merge(color: "bronze"))
    end
    render json: badge
  end

  def update
    @badge.update!(badge_params)
    render json: @badge
  end

  def destroy
    @badge.destroy!
    render json: @badge
  end

  private

    def set_badge
      @badge = Badge.find(params[:id])
    end

    def badge_params
      params.require(:badge).permit(:index, :color).merge(category_id: params[:category_id])
    end
end
