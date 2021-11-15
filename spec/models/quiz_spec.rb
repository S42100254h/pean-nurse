require "rails_helper"

RSpec.describe Quiz, type: :model do
  describe "normal scenario" do
    context "title were enterd" do
      let(:quiz) { build(:quiz) }
      it "Quiz is created" do
        expect(quiz.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "title is not entered" do
      let(:quiz) { build(:quiz, title: nil) }
      it "error occurs" do
        quiz.valid?
        expect(quiz.errors.messages[:title]).to include "can't be blank"
      end
    end
    
    context "same title has already existed" do
      let(:quiz) { build(:quiz, title: "neko") }
      let!(:old_quiz) { create(:quiz, title: "neko") }
      
      it "error occurs" do
        quiz.valid?
        expect(quiz.errors.messages[:title]).to include "has already been taken"
      end
    end
  end
end
