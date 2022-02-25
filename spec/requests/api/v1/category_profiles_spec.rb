require "rails_helper"

RSpec.describe "Api::V1::CategoryProfiles", type: :request do
  describe "POST /api/v1/category_profiles" do
    subject { post(api_v1_category_profiles_path, params: params, headers: headers) }

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

  describe "GET /api/v1/category_profiles?category_id=number" do
    subject { get(api_v1_category_profiles_path, params: { category_id: category_id }) }

    before do
      create(:category, id: 1)
      create(:category, id: 2)
      create(:category_profile, category_id: 1)
      create(:category_profile, category_id: 2)
    end

    let(:category_id) { 1 }

    it "gets category_profile which is related to category_id" do
      subject
      res = JSON.parse(response.body)
      expect(res.keys).to eq ["id", "title", "image", "caption", "uid", "category_id", "created_at", "updated_at"]
      expect(res["category_id"]).to eq category_id
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/category_profiles/:id" do
    subject { get(api_v1_category_profile_path(category_profile_id)) }

    context "specified id exists" do
      let(:category_profile) { create(:category_profile) }
      let(:category_profile_id) { category_profile.uid }

      it "gets detail of category_profile" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq category_profile.id
        expect(res["title"]).to eq category_profile.title
        expect(res["image"]["url"]).to eq category_profile.image.url
        expect(res["caption"]).to eq category_profile.caption
        expect(res["uid"]).to eq category_profile.uid
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "PATCH /api/v1/category_profiles/:id" do
    subject { patch(api_v1_category_profile_path(category_profile_id), params: params, headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:params) { { category_profile: { title: Faker::Lorem.word, created_at: Time.current } } }
    let(:category_profile_id) { category_profile.id }
    let(:category_profile) { create(:category_profile) }

    it "category_profile is updated" do
      expect { subject }.to change { category_profile.reload.title }.from(category_profile.title).to(params[:category_profile][:title]) &
                            not_change { category_profile.reload.created_at }
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/category_profiles/:id" do
    subject { delete(api_v1_category_profile_path(category_profile_id), headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:category_profile_id) { category_profile.id }
    let!(:category_profile) { create(:category_profile) }

    it "category_profile is deleted" do
      expect { subject }.to change { CategoryProfile.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
