require "rails_helper"

RSpec.describe Stack, type: :model do
  describe "normal scenario" do
    context "user exists" do
      let(:stack) { build(:stack) }
      it "stack is created" do
        expect(stack.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "user doesn't exist" do
      let(:stack) { build(:stack, user_id: nil) }
      it "error occurs" do
        stack.valid?
        expect(stack.errors.messages[:user]).to include "must exist"
      end
    end
  end
end
