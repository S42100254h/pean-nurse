require "rails_helper"

RSpec.describe CategoryQuizRelation, type: :model do
  describe "normal scenario" do
    context "category_id andquiz_id are valid" do
      let(:category) { create(:category) }
      let(:quiz) { create(:quiz) }
      let!(:category_quiz_relation) { create(:category_quiz_relation, category: category, quiz: quiz) }

      it "category_quiz_relation is created" do
        expect(category_quiz_relation.valid?).to eq true
      end
    end
  end

  describe "exception scenario" do
    context "category_id is blank" do
      let(:category) { create(:category) }
      let(:quiz) { create(:quiz) }
      let!(:category_quiz_relation) { create(:category_quiz_relation, category: category, quiz: quiz) }

      it "error occurs" do
        category_quiz_relation.category_id = nil
        category_quiz_relation.valid?
        expect(category_quiz_relation.errors.messages[:category]).to include "must exist"
      end
    end

    context "quiz_id is blank" do
      let(:category) { create(:category) }
      let(:quiz) { create(:quiz) }
      let!(:category_quiz_relation) { create(:category_quiz_relation, category: category, quiz: quiz) }

      it "error occurs" do
        category_quiz_relation.quiz_id = nil
        category_quiz_relation.valid?
        expect(category_quiz_relation.errors.messages[:quiz]).to include "must exist"
      end
    end
  end
end
