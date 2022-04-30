require "rails_helper"

RSpec.describe "Api::V1::Quizzes", type: :request do
  describe "POST /api/v1/quizzes" do
    subject { post(api_v1_quizzes_path, params: params, headers: current_admin.create_new_auth_token) }

    describe "normal scenario" do
      context "send correct quiz information" do
        let(:params) { { quiz: attributes_for(:quiz, { category_ids: [category_ids] }) } }
        let(:current_admin) { create(:admin) }
        let!(:category_ids) { category.id }
        let!(:category) { create(:category) }

        it "Quiz and CategoryQuizRelation are created" do
          expect { subject }.to change { Quiz.count }.by(1) &
                                change { CategoryQuizRelation.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end

      context "send correct quiz information with choices and commentary" do
        let(:params) { { quiz: attributes_for(:quiz, { category_ids: [category_ids] }), choices: attributes_for_list(:choice, 4), commentary: attributes_for(:commentary) } }
        let(:current_admin) { create(:admin) }
        let!(:category_ids) { category.id }
        let!(:category) { create(:category) }

        it "Quiz, CategoryQuizRelation and choices are created" do
          expect { subject }.to change { Quiz.count }.by(1) &
                                change { CategoryQuizRelation.count }.by(1) &
                                change { Choice.count }.by(4) &
                                change { Commentary.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end

      context "send correct quiz information without category_ids" do
        let(:params) { { quiz: attributes_for(:quiz) } }
        let(:current_admin) { create(:admin) }
        let!(:category_ids) { category.id }
        let!(:category) { create(:category) }

        it "Quiz is created" do
          expect { subject }.to change { Quiz.count }.by(1) &
                                change { CategoryQuizRelation.count }.by(0)
          expect(response).to have_http_status(200)
        end
      end
    end

    describe "exception scenario" do
      context "send correct quiz and commentary information with incorrect choices" do
        let(:params) { { quiz: attributes_for(:quiz), category_ids: category.id, choices: [attributes_for_list(:choice, 2), attributes_for(:choice, id: choice.id)], commentary: attributes_for(:commentary) } }
        let(:current_admin) { create(:admin) }
        let!(:category) { create(:category) }
        let!(:choice) { create(:choice) }

        it "Quiz, CategoryQuizRelation, choices and commentary are not created (rollback works)" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotUnique) &
                                change { Quiz.count }.by(0) &
                                change { CategoryQuizRelation.count }.by(0) &
                                change { Choice.count }.by(0) &
                                change { Commentary.count }.by(0)
        end
      end
    end
  end

  describe "GET /api/v1/quizzes" do
    subject { get(api_v1_quizzes_path) }

    before do
      create_list(:quiz, 8)
    end

    it "get list of quizzes" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 8
      expect(res[0].keys).to eq ["id", "title", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/quizzes?category_uid=string" do
    subject { get(api_v1_quizzes_path, params: { category_uid: category_uid }) }

    before do
      create(:quiz, id: 1)
      create(:quiz, id: 2)
      create(:quiz, id: 3)
      create(:category, id: 1, uid: "neko")
      create(:category, id: 2, uid: "cat")
      create(:category_quiz_relation, quiz_id: 1, category_id: 1)
      create(:category_quiz_relation, quiz_id: 2, category_id: 1)
      create(:category_quiz_relation, quiz_id: 3, category_id: 2)
    end

    let(:category_uid) { "neko" }

    it "gets quizzes which are related to category_id" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
      expect(res[0]["id"]).to eq 1
      expect(res[1]["id"]).to eq 2
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/quizzes/:id" do
    subject { get(api_v1_quiz_path(quiz_id)) }

    context "specified id exists" do
      let(:quiz) { create(:quiz) }
      let(:quiz_id) { quiz.id }

      it "get detail of quiz" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq quiz.id
        expect(res["title"]).to eq quiz.title
        expect(response).to have_http_status(200)
      end
    end

    context "specified id does not exist" do
      let(:quiz_id) { 99999 }

      it "can't get detail of quiz" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "PATCH /api/v1/quizzes/:id" do
    subject { patch(api_v1_quiz_path(quiz.id), params: params, headers: current_admin.create_new_auth_token) }

    describe "normal scenario" do
      context "update quiz without choices and commentary" do
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current } } }
        let(:quiz) { create(:quiz) }

        it "quiz is updated" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                not_change { quiz.reload.created_at }
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz with choice and commentary" do
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choice.id)], commentary: { text: Faker::Lorem.sentence } } }
        let(:quiz) { create(:quiz) }
        let!(:choice) { create(:choice, quiz_id: quiz.id) }
        let!(:commentary) { create(:commentary, quiz_id: quiz.id) }

        it "quiz and choice is updated" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { choice.reload.choice }.from(choice.choice).to(params[:choices][0][:choice]) &
                                change { commentary.reload.text }.from(commentary.text).to(params[:commentary][:text]) &
                                not_change { quiz.reload.created_at }
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz with new choices" do
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choice.id), attributes_for_list(:choice, 2)], commentary: { text: commentary.text } } }
        let(:quiz) { create(:quiz) }
        let!(:choice) { create(:choice, quiz_id: quiz.id) }
        let!(:commentary) { create(:commentary, quiz_id: quiz.id) }

        it " quiz is updated and new choices are created" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { Choice.count }.by(2)
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz without existing chioce" do
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choices[0].id)], commentary: { text: commentary.text } } }
        let(:quiz) { create(:quiz) }
        let!(:choices) { create_list(:choice, 2, quiz_id: quiz.id) }
        let!(:commentary) { create(:commentary, quiz_id: quiz.id) }

        it "quiz is updated and existing choice is deleted" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { Choice.count }.by(-1)
          expect(response).to have_http_status(200)
        end
      end
    end
  end

  describe "DELETE /api/v1/quizzes/:id" do
    subject { delete(api_v1_quiz_path(quiz.id), headers: current_admin.create_new_auth_token) }

    let(:current_admin) { create(:admin) }
    let!(:quiz) { create(:quiz) }

    it "quiz is deleted" do
      expect { subject }.to change { Quiz.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/quizzes/exam/:category_uid/:id" do
    subject { get(api_v1_exam_quizzes_path(category_uid, exam_id)) }

    before do
      create(:category, id: 1, uid: "neko")
      create(:category, id: 2, uid: "dummy")
      create_list(:quiz, 14, category_ids: 1)
      create_list(:quiz, 14, category_ids: 2)
    end

    let(:category_uid) { "neko" }
    let(:exam_id) { 1 }

    it "gets seven quizzes" do
      subject
      res = JSON.parse(response.body)
      quiz_id = res[0]["id"]
      related_category_id = CategoryQuizRelation.find_by(quiz_id: quiz_id).category_id
      expect(res.length).to eq 7
      expect(res[0].keys).to eq ["id", "title", "created_at", "updated_at"]
      expect(related_category_id).to eq 1
      expect(response).to have_http_status(200)
    end
  end
end
