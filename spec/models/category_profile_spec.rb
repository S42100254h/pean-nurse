require "rails_helper"

RSpec.describe CategoryProfile, type: :model do
  describe "normal scenario" do
    context "necessary information were enterd" do
      let(:category_profile) { build(:category_profile) }

      it "category_profile is created" do
        expect(category_profile.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "title is not entered" do
      let(:category_profile) { build(:category_profile, title: nil) }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:title]).to include "can't be blank"
      end
    end

    context "image is not entered" do
      let(:category_profile) { build(:category_profile, image: nil) }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:image]).to include "can't be blank"
      end
    end

    context "caption is not entered" do
      let(:category_profile) { build(:category_profile, caption: nil) }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:caption]).to include "can't be blank"
      end
    end

    context "uid is not entered" do
      let(:category_profile) { build(:category_profile, uid: nil) }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:uid]).to include "can't be blank"
      end
    end

    context "same title has already existed" do
      let(:category_profile) { build(:category_profile, title: "neko") }
      let!(:old_category_profile) { create(:category_profile, title: "neko") }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:title]).to include "has already been taken"
      end
    end

    context "same uid has already existed" do
      let(:category_profile) { build(:category_profile, uid: "cat") }
      let!(:old_category_profile) { create(:category_profile, uid: "cat") }

      it "error occurs" do
        category_profile.valid?
        expect(category_profile.errors.messages[:uid]).to include "has already been taken"
      end
    end
  end
end
