require "rails_helper"

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

  describe "GET /api/v1/stacks" do
    subject { get(api_v1_stacks_path, headers: headers) }

    before do
      create(:user, id: 1)
      create(:user, id: 2)
      create_list(:stack, 4, user_id: 1)
      create_list(:stack, 8, user_id: 2)
    end

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { User.find(1) }

    it "get stacks" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 4
      expect(response).to have_http_status(200)
    end
  end
end
