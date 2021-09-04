class Api::V1::InquiriesController < ApplicationController
  def create
    @inquiry = Inquiry.new(inquiry_params)
    @file = params[:image].tempfile
    
    if @inquiry
      InquiryMailer.send_mail(@inquiry, @file).deliver
    end
  end
  
  private
    def inquiry_params
      params.permit(:email, :select, :text, :image)
    end
end
