require 'rails_helper'

RSpec.describe CategoryProfile, type: :model do
  describe "normal scenario" do
    context "necessary information were enterd" do
      let(:category_profile) { build(:category_profile) }

      it "category_profile is created" do
        expect(category_profile.valid?).to eq true
      end
    end
  end
end
