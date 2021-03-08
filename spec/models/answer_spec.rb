require "rails_helper"

RSpec.describe Answer, type: :model do
  describe "normal scenario" do
    context "answer1..4, correct_answer_no, commentary were entered" do
      let(:answer) { build(:answer) }
      it "answer is created" do
        expect(answer.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "answer1 is not entered" do
      let(:answer) { build(:answer, answer1: nil) }
      it "error occurs" do
        answer.valid?
        expect(answer.errors.messages[:answer1]).to include "can't be blank"
      end
    end

    context "correct_answer_no is not entered" do
      let(:answer) { build(:answer, correct_answer_no: nil) }
      it "error occurs" do
        answer.valid?
        expect(answer.errors.messages[:correct_answer_no]).to include "can't be blank"
      end
    end

    context "commentary is not entered" do
      let(:answer) { build(:answer, commentary: nil) }
      it "error occurs" do
        answer.valid?
        expect(answer.errors.messages[:commentary]).to include "can't be blank"
      end
    end
  end
end
