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

  describe "GET /api/v1/users" do
    subject { get(api_v1_users_path, headers: headers) }

    before do
      create_list(:user, 8)
    end

    let(:current_admin) { create(:admin) }
    let(:headers) { current_admin.create_new_auth_token }

    it "get list of users" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 8
      expect(res[0].keys).to eq ["id", "provider", "uid", "allow_password_change", "name", "nickname", "image", "email", "created_at", "updated_at", "level", "exp"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/users/:id" do
    subject { get(api_v1_user_path(user_id), headers: headers) }

    let(:current_admin) { create(:admin) }
    let(:headers) { current_admin.create_new_auth_token }
    let(:user_id) { user.id }
    let!(:user) { create(:user) }

    it "get detail of user" do
      subject
      res = JSON.parse(response.body)
      expect(res.keys).to eq ["id", "provider", "uid", "allow_password_change", "name", "nickname", "image", "email", "created_at", "updated_at", "level", "exp"]
      expect(response).to have_http_status(200)
    end
  end

  describe "PATCH /api/v1/users/:id" do
    subject { patch(api_v1_user_path(user_id), params: params, headers: headers) }

    let(:current_admin) { create(:admin) }
    let(:headers) { current_admin.create_new_auth_token }
    let(:params) { { user: { name: Faker::Name.name } } }
    let(:user_id) { user.id }
    let!(:user) { create(:user) }

    it "user is updated" do
      expect { subject }.to change { user.reload.name }.from(user.name).to(params[:user][:name])
      expect(response).to have_http_status(200)
    end
  end

  describe "PATCH /api/v1/users/add_exp" do
    subject { patch(api_v1_users_add_exp_path, headers: headers, params: params) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) { { user: { exp: 100 } } }

    it "exp of user is updated" do
      expect { subject }.to change { current_user.reload.exp }.from(current_user.exp).to(params[:user][:exp])
      expect(response).to have_http_status(200)
    end
  end

  describe "PATCH /api/v1/users/level_up" do
    subject { patch(api_v1_users_level_up_path, params: params, headers: headers) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) { { user: { level: 2 } } }

    it "level of user is updated" do
      expect { subject }.to change { current_user.reload.level }.from(current_user.level).to(params[:user][:level])
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/users/:id" do
    subject { delete(api_v1_user_path(user_id), headers: headers) }

    let(:current_admin) { create(:admin) }
    let(:headers) { current_admin.create_new_auth_token }
    let(:user_id) { user.id }
    let!(:user) { create(:user) }

    it "delete user" do
      expect { subject }.to change { User.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
