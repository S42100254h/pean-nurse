require "rails_helper"

RSpec.describe Admin, type: :model do
  describe "normail scenario" do
    context "name, email and password were entered" do
      let(:admin) { build(:admin) }
      it "Admin is created" do
        expect(admin.valid?).to eq true
      end
    end
  end
end
