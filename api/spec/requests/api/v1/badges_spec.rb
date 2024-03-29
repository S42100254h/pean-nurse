require "rails_helper"

RSpec.describe "Api::V1::Badges", type: :request do
  describe "POST /api/v1/badges" do
    subject { post(api_v1_badges_path, params: params, headers: headers) }

    context "send correct badge information" do
      let(:params) { { badge: attributes_for(:badge), category_id: category.id } }
      let(:headers) { current_user.create_new_auth_token }
      let!(:category) { create(:category) }
      let!(:current_user) { create(:user) }

      it "Badge is created" do
        expect { subject }.to change { Badge.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end

    context "badge has already existed" do
      let(:params) { { badge: attributes_for(:badge, index: 1), category_id: category.id } }
      let(:headers) { current_user.create_new_auth_token }
      let!(:badge) { create(:badge, index: 1, color: "bronze", category_id: category.id, user_id: current_user.id) }
      let!(:category) { create(:category) }
      let!(:current_user) { create(:user) }

      it "Badge color is updated" do
        expect { subject }.to change { Badge.count }.by(0) &
                              change { badge.reload.color }.from("bronze").to("silver")
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "GET /api/v1/badges" do
    subject { get(api_v1_badges_path, headers: headers) }

    before do
      create(:user, id: 1)
      create(:user, id: 2)
      create_list(:badge, 2, user_id: 1, color: "bronze")
      create_list(:badge, 4, user_id: 1, color: "silver")
      create_list(:badge, 8, user_id: 1, color: "gold")
      create_list(:badge, 2, user_id: 2, color: "bronze")
    end

    let(:current_user) { User.find(1) }
    let(:headers) { current_user.create_new_auth_token }

    it "gets list of badges" do
      subject
      res = JSON.parse(response.body)
      expect(res["bronze"].length).to eq 2
      expect(res["silver"].length).to eq 4
      expect(res["gold"].length).to eq 8
      expect(res["bronze"][0].keys).to eq ["id", "index", "color", "user_id", "category_id", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/badges/:id" do
    subject { get(api_v1_badge_path(badge_id)) }

    context "specified id exists" do
      let(:badge) { create(:badge) }
      let(:badge_id) { badge.id }

      it "gets detail of badge" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq badge.id
        expect(res["index"]).to eq badge.index
        expect(res["color"]).to eq badge.color
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "PATCH /api/v1/badges/:id" do
    subject { patch(api_v1_badge_path(badge.id), params: params, headers: headers) }

    let(:params) { { badge: attributes_for(:badge, index: 1, color: "gold"), user_id: current_user.id, category_id: category.id } }
    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let!(:badge) { create(:badge, index: 1, color: "silver", user_id: current_user.id, category_id: category.id) }
    let(:category) { create(:category) }

    it "badge is updated" do
      expect { subject }.to change { badge.reload.color }.from(badge.color).to(params[:badge][:color])
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/badges/:id" do
    subject { delete(api_v1_badge_path(badge.id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let!(:badge) { create(:badge, id: 1) }

    it "badge is deleted" do
      expect { subject }.to change { Badge.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
