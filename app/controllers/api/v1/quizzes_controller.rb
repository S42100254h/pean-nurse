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
        commentary = quiz.create_commentary(params[:commentary])
        render json: { quiz: quiz, choices: choices, commentary: commentary }
      end
    else
      # enable to create Only quiz without choices
      quiz = Quiz.create!(quiz_params)
      render json: quiz
    end
  end

  def update
    if params[:choices]
      ActiveRecord::Base.transaction do
        @quiz.update!(quiz_params)
        updated_choices = @quiz.update_choices(params[:choices])
        deleted_choices = @quiz.delete_choices(params[:choices])
        added_choices = @quiz.add_choices(params[:choices])
        updated_commentary = @quiz.update_commentary(params[:commentary])
        render json: { quiz: @quiz, updated_choices: updated_choices, deleted_choices: deleted_choices, added_choices: added_choices, updated_commentary: updated_commentary }
      end
    else
      @quiz.update!(quiz_params)
      render json: @quiz
    end
  end

  def destroy
    @quiz.destroy!
    render json: @quiz
  end

  def exam_index
    from = (params[:exam_id].to_i - 1) * 7
    to = from + 6
    quizzes = Quiz.all[from..to]
    render json: quizzes
  end

  private

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:title).merge(category_ids: params[:category_ids])
    end
end
