class Api::V1::UsersController < Api::V1::ApiController
  before_action :set_user, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:currentuser, :add_exp, :level_up]
  before_action :authenticate_admin!, only: [:index, :show, :update, :destroy]

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def currentuser
    @user = current_user
    render json: @user
  end

  def add_exp
    @user = current_user
    total_exp = @user.exp.to_i + params[:user][:exp].to_i
    @user.update!(exp: total_exp)
    render json: @user
  end

  def level_up
    @user = current_user
    @user.update!(user_params)
    render json: @user
  end

  def update
    @user.update!(user_params)
    render json: @user
  end

  def destroy
    @user.destroy!
    render json: @user
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :exp, :level)
    end
end
