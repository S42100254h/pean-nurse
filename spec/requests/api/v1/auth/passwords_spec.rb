require "rails_helper"

RSpec.describe "Api::V1::Auth::Passwords", type: :request do
  describe "POST /api/v1/auth/password" do
    subject { post(api_v1_user_password_path, params: params) }
    
    context "send correct email" do
      let(:params) { { email: user.email } }
      let!(:user) { create(:user, email: "neko@gmail.com") }

      it "email is sent" do
        subject
        res = response.body
        expect(res).to include "An email has been sent"
        expect(response).to have_http_status(200)
      end
    end
  end
end
