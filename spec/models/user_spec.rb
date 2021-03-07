require "rails_helper"

RSpec.describe User, type: :model do
  describe "normal scenario" do
    context "name, email and password were entered" do
      let(:user) { build(:user) }
      it "User is created" do
        expect(user.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    describe "about name" do
      context "name is not entered" do
        let(:user) { build(:user, name: nil) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:name]).to include "can't be blank"
        end
      end

      context "length of name is over 50 characters" do
        let(:user) { build(:user, name: "a" * 51) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:name]).to include "is too long (maximum is 50 characters)"
        end
      end
    end

    describe "about email" do
      context "email is not entered" do
        let(:user) { build(:user, email: nil) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:email]).to include "can't be blank"
        end
      end

      context "exist same email" do
        let!(:old_user) { create(:user, email: "neko@gmail.com") }
        let(:user) { build(:user, email: "neko@gmail.com") }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:email]).to include "has already been taken"
        end
      end

      context "not applicable to email Regex(/\A[^@\s]+@[^@\s]+\z/)" do
        let(:user) { build(:user, email: "neko") }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:email]).to include "is not an email"
        end
      end
    end

    describe "about password" do
      context "password is not entered" do
        let(:user) { build(:user, password: nil) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:password]).to include "can't be blank"
        end
      end

      context "password is less than 6 characters" do
        let(:user) { build(:user, password: "a" * 5) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:password]).to include "is too short (minimum is 6 characters)"
        end
      end

      context "password is over 129 characters" do
        let(:user) { build(:user, password: "a" * 129) }
        it "error occurs" do
          user.valid?
          expect(user.errors.messages[:password]).to include "is too long (maximum is 128 characters)"
        end
      end
    end
  end
end
