class InquiryMailer < ApplicationMailer
  default from: ENV["FROM_MAIL_ADDRESS"]

  def send_mail(inquiry, file)
    @inquiry = inquiry
    @file = file
    attachments["test"] = File.read(@file)
    mail(
      to: ENV["TO_MAIL_ADDRESS"],
      subject: "【要確認】お問い合わせメール"
    )
  end
end
