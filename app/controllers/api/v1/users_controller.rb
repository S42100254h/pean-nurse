class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user!

  def currentuser
    @user = current_user
    render json: @user 
  end
end