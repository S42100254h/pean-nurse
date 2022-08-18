require "rails_helper"

RSpec.describe "Api::V1::Inquiries", type: :request do
  describe "POST /api/v1/inquiries/create" do
    subject { post(api_v1_inquiries_create_path, params: params, headers: headers) }

    context "send correct inquiry information" do
      let(:headers) { user.create_new_auth_token }
      let!(:user) { create(:user) }
      let(:params) { attributes_for(:inquiry) }

      it "User can send email" do
        subject
        expect(response).to have_http_status(204)
      end
    end
  end
end
