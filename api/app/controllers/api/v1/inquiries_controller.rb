class Api::V1::InquiriesController < Api::V1::ApiController
  before_action :authenticate_user!

  def create
    @inquiry = current_user.inquiries.new(inquiry_params)

    unless params[:image].nil?
      @file = params[:image].tempfile
      @filename = params[:image].original_filename
    end

    if @inquiry.valid?
      InquiryMailer.send_mail(@inquiry, @file, @filename).deliver
      InquiryMailer.reply_mail(@inquiry, @file, @filename).deliver
    end
  end

  private

    def inquiry_params
      params.permit(:email, :select, :text, :image, :name)
    end
end
