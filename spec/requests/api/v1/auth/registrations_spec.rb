require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    subject { post(api_v1_user_registration_path, params: params) }

    context "send correct user information" do
      let(:params) { attributes_for(:user) }

      it "User can sign up" do
        expect { subject }.to change { User.count }.by(1)
        headers = response.headers
        expect(headers["uid"]).to be_present
        expect(headers["client"]).to be_present
        expect(headers["access-token"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "name is blank" do
      let(:params) { attributes_for(:user, name: nil) }

      it "User cannot sign up" do
        expect { subject }.to change { User.count }.by(0)
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(422)
      end
    end

    context "email is blank" do
      let(:params) { attributes_for(:user, email: nil) }

      it "User cannot sign up" do
        expect { subject }.to change { User.count }.by(0)
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(422)
      end
    end

    context "password is blank" do
      let(:params) { attributes_for(:user, password: nil) }

      it "User cannot sign up" do
        expect { subject }.to change { User.count }.by(0)
        headers = response.headers
        expect(headers["uid"]).to be nil
        expect(headers["client"]).to be nil
        expect(headers["access-token"]).to be nil
        expect(response).to have_http_status(422)
      end
    end
  end
end
