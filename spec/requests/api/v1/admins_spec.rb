require "rails_helper"

RSpec.describe "Api::V1::Admins", type: :request do
  describe "GET /api/v1/currentadmin" do
    subject { get(api_v1_admins_currentadmin_path, headers: headers) }

    let(:headers) { admin.create_new_auth_token }
    let!(:admin) { create(:admin) }

    it "Get current admin" do
      subject
      body = JSON.parse(response.body)
      expect(body["uid"]).to be_present
      expect(body["name"]).to be_present
      expect(response).to have_http_status(200)
    end
  end
end
