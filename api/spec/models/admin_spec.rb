require "rails_helper"

RSpec.describe Admin, type: :model do
  describe "normail scenario" do
    context "name, email and password were entered" do
      let(:admin) { build(:admin) }
      it "Admin is created" do
        expect(admin.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    describe "about name" do
      context "name was not entered" do
        let(:admin) { build(:admin, name: nil) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:name]).to include "can't be blank"
        end
      end

      context "length of name is over 50 characters" do
        let(:admin) { build(:admin, name: "a" * 51) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:name]).to include "is too long (maximum is 50 characters)"
        end
      end
    end

    describe "about email" do
      context "email was not entered" do
        let(:admin) { build(:admin, email: nil) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:email]).to include "can't be blank"
        end
      end

      context "exist same email" do
        let!(:old_admin) { create(:admin, email: "neko@gmail.com") }
        let(:admin) { build(:admin, email: "neko@gmail.com") }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:email]).to include "has already been taken"
        end
      end

      context "not applicable to email Regex(/\A[^@\s]+@[^@\s]+\z/)" do
        let(:admin) { build(:admin, email: "neko") }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:email]).to include "is not an email"
        end
      end
    end

    describe "about password" do
      context "password is not entered" do
        let(:admin) { build(:admin, password: nil) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:password]).to include "can't be blank"
        end
      end

      context "password is less than 6 characters" do
        let(:admin) { build(:admin, password: "a" * 5) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:password]).to include "is too short (minimum is 6 characters)"
        end
      end

      context "password is over 129 characters" do
        let(:admin) { build(:admin, password: "a" * 129) }
        it "error occurs" do
          admin.valid?
          expect(admin.errors.messages[:password]).to include "is too long (maximum is 128 characters)"
        end
      end
    end
  end
end
