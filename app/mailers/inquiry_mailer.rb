class InquiryMailer < ApplicationMailer
  default from: ENV["FROM_MAIL_ADDRESS"]

  def send_mail(inquiry, file, filename)
    @inquiry = inquiry

    unless file.nil?
      @file = file
      @filename = filename
      attachments[@filename] = File.read(@file)
    end

    mail(
      to: ENV["TO_MAIL_ADDRESS"],
      subject: "【要確認】お問い合わせメール",
    )
  end

  def reply_mail(inquiry, file, filename)
    @inquiry = inquiry
    @file = file
    @filename = filename
    mail(
      to: "sawabe0v0@gmail.com",
      subject: "reply test"
    )
  end
end
