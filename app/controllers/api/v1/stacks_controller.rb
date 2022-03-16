class Api::V1::StacksController < Api::V1::ApiController
  before_action :authenticate_user!

  def index
    stacks = current_user.stacks
    render json: stacks
  end

  def create
    stack = current_user.stacks.create!
    render json: stack
  end
end
