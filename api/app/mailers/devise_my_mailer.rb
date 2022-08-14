class DeviseMyMailer < Devise::Mailer
  def reset_password_instructions(record, token, opt = {})
    mail = super
    mail.subject = "パスワードの再設定について"
    mail
  end

  def headers_for(action, opts)
    super.merge!(template_path: "users/mailer")
  end
end
