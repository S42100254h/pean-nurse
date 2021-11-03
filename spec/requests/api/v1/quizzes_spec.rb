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
end
