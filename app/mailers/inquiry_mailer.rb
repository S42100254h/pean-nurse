class InquiryMailer < ApplicationMailer
  default from: "nursestepinquiry@gmail.com"

  def send_mail(inquiry, file)
    @inquiry = inquiry
    @file = file
    attachments["test"] = File.read(@file)
    mail(
      to: "sawabe0v0@gmail.com",
      subject: "【要確認】お問い合わせメール"
    )
  end
end
