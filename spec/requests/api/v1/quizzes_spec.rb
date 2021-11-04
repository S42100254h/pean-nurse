require 'rails_helper'

RSpec.describe "Api::V1::Quizzes", type: :request do

  describe "POST/api/v1/quizzes" do
    subject { post(api_v1_quizzes_path, params: params, headers: headers) }

    context "send correct quiz information" do
      let(:params) { { quiz: attributes_for(:quiz) } }
      let(:current_admin) { create(:admin) }
      let(:headers) { current_admin.create_new_auth_token }

      it "Quiz is created" do
        expect{ subject }.to change { Quiz.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end
  
  describe "GET/api/v1/quizzes" do
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
  
  describe "GET/api/v1/quizzes/:id" do
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
  
  describe "PATCH/api/v1/quizzes/:id" do
    subject { patch(api_v1_quiz_path(quiz_id), params: params, headers: headers) }
    
    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:params) { { quiz: { title: Faker::Lorem.question, created_at: Time.current } } }
    let(:quiz_id) { quiz.id }
    let(:quiz) { create(:quiz) }
    
    it "quiz is updated" do
      expect { subject }.to change { quiz.reload.title }.from(quiz.title).to(params[:quiz][:title]) &
                            not_change { quiz.reload.created_at }
      expect(response).to have_http_status(200)
    end
  end
end
