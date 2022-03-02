require "rails_helper"

RSpec.describe Experience, type: :model do
  describe "normal scenario" do
    context "level and experience are entered" do
      let(:experience) { build(:experience) }
      it "experience is created" do
        expect(experience.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "level is not entered" do
      let(:experience) { build(:experience, level: nil)}
      it "error occurs" do
        experience.valid?
        expect(experience.errors.messages[:level]).to include "can't be blank"
      end
    end

    context "same level exists" do
      let!(:old_experience) { create(:experience, level: 10) }
      let(:experience) { build(:experience, level: 10) } 
      it "error occurs" do
        experience.valid?
        expect(experience.errors.messages[:level]).to include "has already been taken"
      end
    end

    context "experience is not entered" do
      let(:experience) { build(:experience, experience: nil)}
      it "error occurs" do
        experience.valid?
        expect(experience.errors.messages[:experience]).to include "can't be blank"
      end
    end

    context "same experience exists" do
      let!(:old_experience) { create(:experience, experience: 1000) }
      let(:experience) { build(:experience, experience: 1000) } 
      it "error occurs" do
        experience.valid?
        expect(experience.errors.messages[:experience]).to include "has already been taken"
      end
    end
  end
end
