class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!, only: [:currentuser]
  before_action :authenticate_admin!, only: [:index]

  def index
    users = User.all
    render json: users
  end

  def currentuser
    @user = current_user
    render json: @user
  end
end
