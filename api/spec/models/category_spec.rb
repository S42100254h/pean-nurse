require "rails_helper"

RSpec.describe Category, type: :model do
  describe "normal scenario" do
    context "name was entered" do
      let(:category) { build(:category) }
      it "category is created" do
        expect(category.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "name is not entered" do
      let(:category) { build(:category, name: nil) }
      it "error occurs" do
        category.valid?
        expect(category.errors.messages[:name]).to include "can't be blank"
      end
    end

    context "same name has already existed" do
      let(:category) { build(:category, name: "neko") }
      let!(:old_category) { create(:category, name: "neko") }
      it "error occurs" do
        category.valid?
        expect(category.errors.messages[:name]).to include "has already been taken"
      end
    end

    context "image is not entered" do
      let(:category) { build(:category, image: nil) }
      it "error occurs" do
        category.valid?
        expect(category.errors.messages[:image]).to include "can't be blank"
      end
    end

    context "caption is not entered" do
      let(:category) { build(:category, caption: nil) }
      it "error occurs" do
        category.valid?
        expect(category.errors.messages[:caption]).to include "can't be blank"
      end
    end

    context "uid is not entered" do
      let(:category) { build(:category, uid: nil) }
      it "error occurs" do
        category.valid?
        expect(category.errors.messages[:uid]).to include "can't be blank"
      end
    end
  end
end
