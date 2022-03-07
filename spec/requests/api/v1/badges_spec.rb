require "rails_helper"

RSpec.describe "Api::V1::Badges", type: :request do
  describe "POST /api/v1/badges" do
    subject { post(api_v1_badges_path, params: params, headers: headers) }

    context "send correct badge information" do
      let(:params) { { badge: attributes_for(:badge), user_id: current_user.id, category_id: category.id } }
      let(:headers) { current_user.create_new_auth_token }
      let!(:category) { create(:category) }
      let!(:current_user) { create(:user) }

      it "Badge is created" do
        expect { subject }.to change { Badge.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "GET /api/v1/badges" do
    subject { get(api_v1_badges_path) }

    before do
      create_list(:badge, 8)
    end

    it "gets list of badges" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 8
      expect(res[0].keys).to eq ["id", "index", "color","user_id", "category_id", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end
end
