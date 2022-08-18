require "rails_helper"

RSpec.describe Badge, type: :model do
  describe "normal scenario" do
    context "correct data is entered" do
      let(:category) { create(:category) }
      let(:user) { create(:user) }
      let(:badge) { build(:badge, user_id: user.id, category_id: category.id) }

      it "badge is created" do
        expect(badge.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "index is blank" do
      let(:category) { create(:category) }
      let(:user) { create(:user) }
      let(:badge) { build(:badge, user_id: user.id, category_id: category.id, index: nil) }

      it "error occurs" do
        badge.valid?
        expect(badge.errors.messages[:index]).to include "can't be blank"
      end
    end

    context "color is blank" do
      let(:category) { create(:category) }
      let(:user) { create(:user) }
      let(:badge) { build(:badge, user_id: user.id, category_id: category.id, color: nil) }

      it "error occurs" do
        badge.valid?
        expect(badge.errors.messages[:color]).to include "can't be blank"
      end
    end

    context "color is not gold, silver or bronze" do
      let(:category) { create(:category) }
      let(:user) { create(:user) }
      let(:badge) { build(:badge, user_id: user.id, category_id: category.id, color: "orange") }

      it "error occurs" do
        badge.valid?
        expect(badge.errors.messages[:color]).to include "is not included in the list"
      end
    end

    context "user_id is blank" do
      let(:category) { create(:category) }
      let(:badge) { build(:badge, user_id: nil, category_id: category.id) }

      it "error occurs" do
        badge.valid?
        expect(badge.errors.messages[:user]).to include "must exist"
      end
    end

    context "category_id is blank" do
      let(:user) { create(:user) }
      let(:badge) { build(:badge, user_id: user.id, category_id: nil) }

      it "error occurs" do
        badge.valid?
        expect(badge.errors.messages[:category]).to include "must exist"
      end
    end
  end
end
