require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/currentuser" do
    subject { get(api_v1_users_currentuser_path, headers: headers) }

    let(:headers) { user.create_new_auth_token }
    let!(:user) { create(:user) }

    it "Get current user" do
      subject
      body = JSON.parse(response.body)
      expect(body["uid"]).to be_present
      expect(body["name"]).to be_present
      expect(response).to have_http_status(200)
    end
  end
end
