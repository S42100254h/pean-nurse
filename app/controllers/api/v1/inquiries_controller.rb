class Api::V1::InquiriesController < ApplicationController
  def create
    @inquiry = Inquiry.new(inquiry_params)

    if @inquiry.save
      InquiryMailer.send_mail(@inquiry).deliver
    end
  end
  
  private
    def inquiry_params
      params.require(:inquiry).permit(:email, :select, :text, :image)
    end
end
