class Api::V1::AdminsController < Api::V1::ApiController
  before_action :authenticate_admin!

  def currentadmin
    @admin = current_admin
    render json: @admin
  end
end
