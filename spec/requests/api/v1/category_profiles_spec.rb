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
  end
end
