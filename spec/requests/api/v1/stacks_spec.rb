require 'rails_helper'

RSpec.describe "Api::V1::Stacks", type: :request do
  describe "POST /api/v1/stacks" do
    subject { post(api_v1_stacks_path, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    it "Stack is created" do
      expect { subject }.to change { Stack.count }.by(1)
      expect(response).to have_http_status(200)
    end
  end
end
