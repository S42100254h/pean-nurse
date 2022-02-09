require "rails_helper"

RSpec.describe "Api::V1::Commentaries", type: :request do
  describe "POST /api/v1/commentaries" do
    subject { post(api_v1_commentaries_path, params: params, headers: headers) }

    describe "normal scenario" do
      context "send correct commentary information" do
        let(:params) { { commentary: attributes_for(:commentary, quiz_id: quiz_id) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let(:quiz_id) { quiz.id }
        let(:quiz) { create(:quiz) }

        it "Commentary is created" do
          expect { subject }.to change { Commentary.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end
    end
  
    describe "exception scenario" do
      context "send commentary information with noexistent quiz id" do
        let(:params) { { commentary: attributes_for(:commentary, quiz_id: quiz_id) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let(:quiz_id) { 999999 }

        it "Commentary is not created" do
          expect { subject }.to raise_error ActiveRecord::RecordInvalid
        end
      end
    end
  end
end
