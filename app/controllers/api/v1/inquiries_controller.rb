class Api::V1::InquiriesController < ApplicationController
  def create
    @inquiry = Inquiry.new(inquiry_params)
    @file = params[:image].tempfile
    @filename = params[:image].original_filename
    
    if @inquiry
      InquiryMailer.send_mail(@inquiry, @file, @filename).deliver
    end
  end
  
  private
    def inquiry_params
      params.permit(:email, :select, :text, :image)
    end
end
