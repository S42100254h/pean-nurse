class Api::V1::QuizzesController < Api::V1::ApiController
  before_action :set_quiz, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    quizzes = Quiz.all
    render json: quizzes
  end

  def show
    quiz = Quiz.find(params[:id])
    render json: quiz
  end

  def create
    if params[:choices]
      ActiveRecord::Base.transaction do
        quiz = Quiz.create!(quiz_params)
        choices = quiz.create_choices(params[:choices])
        render json: { quiz: quiz, choices: choices }
      end
    else
      # enable to create Only quiz without choices
      quiz = Quiz.create!(quiz_params)
      render json: quiz
    end
  end

  def update
    @quiz.update!(quiz_params)
    render json: @quiz
  end

  def destroy
    @quiz.destroy!
    render json: @quiz
  end

  private

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:title).merge(category_ids: params[:category_ids])
    end
end
