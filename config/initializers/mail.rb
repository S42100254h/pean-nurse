if Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    address: "smtp.gmail.com",
    domain: "gmail.com",
    port: 587,
    user_name: ENV["FROM_MAIL_ADDRESS"],
    password: ENV["MAILER_PASS"],
    authentication: "plain",
    enable_starttls_auto: true,
  }
elsif Rails.env.development?
  ActionMailer::Base.default_url_options = { host: "localhost", port: 4000 }
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.perform_deliveries = true
  ActionMailer::Base.raise_delivery_errors = true
  ActionMailer::Base.smtp_settings = {
    address: "smtp.gmail.com",
    domain: "gmail.com",
    port: 587,
    user_name: ENV["FROM_MAIL_ADDRESS"],
    password: ENV["MAILER_PASS"],
    authentication: "login",
    enable_starttls_auto: true,
  }
  # ActionMailer::Base.delivery_method = :letter_opener
else
  ActionMailer::Base.delivery_method = :test
end
