require "rails_helper"

RSpec.describe Choice, type: :model do
  describe "normal scenario" do
    context "choice was entered" do
      let(:choice) { build(:choice) }
      it "choice is created" do
        expect(choice.valid?).to eq true
      end
    end
  end
end
