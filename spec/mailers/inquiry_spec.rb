require "rails_helper"

RSpec.describe InquiryMailer, type: :mailer do
  describe "normal scenario" do
    context "email, select, text and image were entered" do
      let(:inquiry) { build(:inquiry) }
      it "Inquiry is created" do
        expect(inquiry.valid?).to eq true
      end
    end

    context "not applicable to email Regex(/\A[^@\s]+@[^@\s]+\z/)" do
      let(:inquiry) { build(:inquiry, email: "neko") }
      it "error occurs" do
        inquiry.valid?
        expect(inquiry.errors.messages[:email]).to include "is invalid"
      end
    end
  end

  describe "exception scenario" do
    describe "about email" do
      context "email is not entered" do
        let(:inquiry) { build(:inquiry, email: nil) }
        it "error occurs" do
          inquiry.valid?
          expect(inquiry.errors.messages[:email]).to include "can't be blank"
        end
      end
    end

    describe "about select" do
      context "select is not entered" do
        let(:inquiry) { build(:inquiry, select: nil) }
        it "error occurs" do
          inquiry.valid?
          expect(inquiry.errors.messages[:select]).to include "can't be blank"
        end
      end
    end

    describe "about text" do
      context "select is not entered" do
        let(:inquiry) { build(:inquiry, text: nil) }
        it "error occurs" do
          inquiry.valid?
          expect(inquiry.errors.messages[:text]).to include "can't be blank"
        end
      end
    end
  end
end
