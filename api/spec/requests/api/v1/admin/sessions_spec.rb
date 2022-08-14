require "rails_helper"

RSpec.describe "Api::V1::Admin::Sessions", type: :request do
  describe "POST /api/v1/admin/sign_in" do
    subject { post(api_v1_admin_session_path, params: params) }

    context "send correct admin information" do
      let(:params) { { email: admin.email, password: admin.password } }
      let!(:admin) { create(:admin) }

      it "Admin can sign in" do
        subject
        headers = response.headers
        expect(headers["uid"]).to be_present
        expect(headers["client"]).to be_present
        expect(headers["access-token"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "email was wrong" do
      let(:params) { { email: Faker::Internet.email, password: admin.password } }
      let!(:admin) { create(:admin) }

      it "Admin cannot sign in" do
        subject
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(401)
      end
    end

    context "password was wrong" do
      let(:params) { { email: admin.email, password: Faker::Internet.password } }
      let!(:admin) { create(:admin) }

      it "Admin cannot sign in" do
        subject
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "DELETE /api/v1/admin/sign_out" do
    subject { delete(destroy_api_v1_admin_session_path, headers: headers) }

    context "send correct information" do
      let(:headers) { admin.create_new_auth_token }
      let!(:admin) { create(:admin) }

      it "Admincan sign out" do
        subject
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(200)
      end
    end
  end
end
