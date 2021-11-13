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
end
