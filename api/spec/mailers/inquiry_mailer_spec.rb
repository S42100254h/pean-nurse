require "rails_helper"

RSpec.describe InquiryMailer, type: :mailer do
  describe "send_mail" do
    subject(:mail) do
      @inquiry = inquiry
      @file = File.join(Rails.root, "app", "assets", "images", "pig.png")
      @filename = "cat.png"

      InquiryMailer.send_mail(@inquiry, @file, @filename).deliver
      ActionMailer::Base.deliveries.last
    end

    let(:inquiry) { build(:inquiry) }

    it "when send_mail" do
      expect(mail.to.first).to eq ENV["TO_MAIL_ADDRESS"]
      expect(mail.from.first).to eq ENV["FROM_MAIL_ADDRESS"]
      expect(mail.subject).to eq "【要確認】お問い合わせメール"

      # test for attachments
      expect(mail.attachments[0]).to be_a_kind_of(Mail::Part)
      expect(mail.attachments[0].content_type).to be_start_with("image/png")
      expect(mail.attachments[0].filename).to eq "cat.png"
    end
  end
end
