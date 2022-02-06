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
end
