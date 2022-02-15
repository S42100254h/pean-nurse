require "rails_helper"

RSpec.describe "Api::V1::CategoryProfiles", type: :request do
  describe "POST /api/v1/category_profiles" do
    subject { post(api_v1_category_profiles_path, params: params, headers: headers)}

    describe "normal scenario" do
      context "send correct category_profile information" do
        let(:params) { { category_profile: attributes_for(:category_profile, category_id: category_id) } }
        let(:headers) { current_admin.create_new_auth_token }
        let(:current_admin) { create(:admin) }
        let(:category_id) { category.id }
        let(:category) { create(:category) }

        it "Category_profile is created" do
          expect { subject }.to change { CategoryProfile.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end
    end

    describe "exception scenario" do
      context "send category_profile information with noexistent category id" do
        let(:params) { { category_profile: attributes_for(:category_profile, category_id: category_id) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let(:category_id) { 999999 }

        it "CategoryProfile is not created" do
          expect { subject }.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end
  end

  describe "GET /api/v1/category_profiles" do
    subject { get(api_v1_category_profiles_path) }

    before do
      create_list(:category_profile, 2)
    end

    it "gets list of category_profiles" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
      expect(res[0].keys).to eq ["id", "title", "image", "caption", "uid", "category_id", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end
end
