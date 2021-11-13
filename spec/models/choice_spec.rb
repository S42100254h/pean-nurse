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

  describe "exception scenario" do
    context "choice was not entered" do
      let(:choice) { build(:choice, choice: nil) }
      it "error occurs" do
        choice.valid?
        expect(choice.errors.messages[:choice]).to include "can't be blank"
      end
    end

    context "is_right was not entered" do
      let(:choice) { build(:choice, is_right: nil) }
      it "error occurs" do
        choice.valid?
        expect(choice.errors.messages[:is_right]).to include "is not included in the list"
      end
    end
  end
end
