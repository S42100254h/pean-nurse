class Api::V1::CommentariesController < Api::V1::ApiController
  before_action :set_commentary, only: [:update, :destroy]
  before_action :authenticate_admin!, only: [:create, :update, :destroy]

  def index
    if params[:quiz_id].instance_of?(Array) == true
      commentaries = []
      params[:quiz_id].each do |id|
        commentaries.push(Commentary.find_by(quiz_id: id))
      end
    elsif params[:quiz_id]
      commentaries = Commentary.find_by(quiz_id: params[:quiz_id])
    else
      commentaries = Commentary.all
    end
    render json: commentaries
  end

  def show
    commentary = Commentary.find(params[:id])
    render json: commentary
  end

  def create
    quiz = Quiz.find(params[:commentary][:quiz_id])
    commentary = quiz.create_Commentary!(commentary_params)
    render json: commentary
  end

  def update
    @commentary.update!(commentary_params)
    render json: @commentary
  end

  def destroy
    @commentary.destroy!
    render json: @commentary
  end

  private

    def set_commentary
      @commentary = Commentary.find(params[:id])
    end

    def commentary_params
      params.require(:commentary).permit(:text, :quiz_id)
    end
end
