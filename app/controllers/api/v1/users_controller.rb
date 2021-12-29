class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:currentuser]
  before_action :authenticate_admin!, only: [:index, :show, :destroy]

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

  def destroy
    @user.destroy!
    render json: @user
  end

  private

    def set_user
      @user = User.find(params[:id])
    end
end
