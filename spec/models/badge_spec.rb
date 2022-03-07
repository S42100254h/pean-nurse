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
end
