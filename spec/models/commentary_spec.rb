require 'rails_helper'

RSpec.describe Commentary, type: :model do
  describe "normal scenario" do
    context "text was enterd" do
      let(:commentary) { build(:commentary) }
      it "commentary is created" do
        expect(commentary.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "text was not entered" do
      let(:commentary) { build(:commentary, text: nil) }
      it "error occurs" do
        commentary.valid?
        expect(commentary.errors.messages[:text]).to include "can't be blank"
      end
    end
  end
end
