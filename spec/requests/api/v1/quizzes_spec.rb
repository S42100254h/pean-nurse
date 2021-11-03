require 'rails_helper'

RSpec.describe "Api::V1::Quizzes", type: :request do

  describe "POST/api/v1/quizzes/create" do
    subject { post(api_v1_quiz_index_path, params: params) }

    context "send correct quiz information" do
      let(:params) { attributes_for(:quiz) }

      it "Quiz is created" do
        expect{ subject }.to change { Quiz.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end
end
