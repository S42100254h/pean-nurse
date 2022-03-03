class Api::V1::ExperiencesController < Api::V1::ApiController
  before_action :set_experience, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    experiences = Experience.all
    render json: experiences
  end

  def show
    experience = Experience.find(params[:id])
    render json: experience
  end

  def create
    experience = Experience.create!(experience_params)
    render json: experience
  end

  def update
    @experience.update!(experience_params)
    render json: @experience
  end

  def destroy
    @experience.destroy!
    render json: @experience
  end

  private

    def set_experience
      @experience = Experience.find(params[:id])
    end

    def experience_params
      params.require(:experience).permit(:level, :experience)
    end
end
