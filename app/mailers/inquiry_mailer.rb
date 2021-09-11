class InquiryMailer < ApplicationMailer
  default from: ENV["FROM_MAIL_ADDRESS"]

  def send_mail(inquiry, file, filename)
    @inquiry = inquiry

    if file != nil
      @file = file
      @filename = filename
      attachments[@filename] = File.read(@file)
    end

    mail(
      to: ENV["TO_MAIL_ADDRESS"],
      subject: "【要確認】お問い合わせメール",
    )
  end
end
