require "rails_helper"

RSpec.describe "Api::V1::Quizzes", type: :request do
  describe "POST /api/v1/quizzes" do
    subject { post(api_v1_quizzes_path, params: params, headers: headers) }

    describe "normal senario" do
      context "send correct quiz information" do
        let(:params) { { quiz: attributes_for(:quiz), category_ids: category_ids } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let!(:category_ids) { category.id }
        let!(:category) { create(:category) }

        it "Quiz and CategoryQuizRelation are created" do
          expect { subject }.to change { Quiz.count }.by(1) &
                                change { CategoryQuizRelation.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end

      context "send correct quiz information with choices" do
        let(:params) { { quiz: attributes_for(:quiz), category_ids: category_ids, choices: attributes_for_list(:choice, 4) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let!(:category_ids) { category.id }
        let!(:category) { create(:category) }

        it "Quiz, CategoryQuizRelation and choices are created" do
          expect { subject }.to change { Quiz.count }.by(1) &
                                change { CategoryQuizRelation.count }.by(1) &
                                change { Choice.count }.by(4)
          expect(response).to have_http_status(200)
        end
      end

      context "send correct quiz information without category_ids" do
        let(:params) { { quiz: attributes_for(:quiz) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
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
      context "send correct quiz information with incorrect choices" do
        let(:params) { { quiz: attributes_for(:quiz), category_ids: category.id, choices: [attributes_for_list(:choice, 2), attributes_for(:choice, id: choice.id)] } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let!(:category) { create(:category) }
        let!(:choice) { create(:choice) }

        it "Quiz, CategoryQuizRelation and choices are not created (rollback works)" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotUnique) &
                                change { Quiz.count }.by(0) &
                                change { CategoryQuizRelation.count }.by(0) &
                                change { Choice.count }.by(0)
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
    subject { patch(api_v1_quiz_path(quiz.id), params: params, headers: headers) }

    describe "normal scenario" do
      context "update quiz without choices" do
        let(:headers) { current_admin.create_new_auth_token }
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current } } }
        let(:quiz) { create(:quiz) }

        it "quiz is updated" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                not_change { quiz.reload.created_at }
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz with choice" do
        let(:headers) { current_admin.create_new_auth_token }
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choice.id)] } }
        let(:quiz) { create(:quiz) }
        let!(:choice) { create(:choice, quiz_id: quiz.id) }

        it "quiz and choice is updated" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { choice.reload.choice }.from(choice.choice).to(params[:choices][0][:choice]) &
                                not_change { quiz.reload.created_at }
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz with new choices" do
        let(:headers) { current_admin.create_new_auth_token }
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choice.id), attributes_for_list(:choice, 2)] } }
        let(:quiz) { create(:quiz) }
        let!(:choice) { create(:choice, quiz_id: quiz.id) }

        it " quiz is updated and new choices are created" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { Choice.count }.by(2)
          expect(response).to have_http_status(200)
        end
      end

      context "update quiz without existing chioce" do
        let(:headers) { current_admin.create_new_auth_token }
        let(:current_admin) { create(:admin) }
        let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current }, choices: [attributes_for(:choice, id: choices[0].id)] } }
        let(:quiz) { create(:quiz) }
        let!(:choices) { create_list(:choice, 2, quiz_id: quiz.id) }

        it "quiz is updated and existing choice is deleted" do
          expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                                change { Choice.count }.by(-1)
          expect(response).to have_http_status(200)
        end
      end
    end
  end

  describe "DELETE /api/v1/quizzes/:id" do
    subject { delete(api_v1_quiz_path(quiz_id), headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:quiz_id) { quiz.id }
    let!(:quiz) { create(:quiz) }

    it "quiz is deleted" do
      expect { subject }.to change { Quiz.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
