class Api::V1::ChoicesController < Api::V1::ApiController
  before_action :set_choice, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    if params[:quiz_id]
      choices = Choice.where(quiz_id: params[:quiz_id])
    else
      choices = Choice.all
    end
    render json: choices
  end

  def show
    choice = Choice.find(params[:id])
    render json: choice
  end

  def create
    quiz = Quiz.find(params[:choice][:quiz_id])
    choice = quiz.choices.create!(choice_params)
    render json: choice
  end

  def update
    @choice.update!(choice_params)
    render json: @choice
  end

  def destroy
    @choice.destroy!
    render json: @choice
  end

  private

    def set_choice
      @choice = Choice.find(params[:id])
    end

    def choice_params
      params.require(:choice).permit(:choice, :is_right, :quiz_id)
    end
end
