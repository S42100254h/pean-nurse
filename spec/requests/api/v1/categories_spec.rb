require "rails_helper"

RSpec.describe "Api::V1::Categories", type: :request do
  describe "POST /api/v1/categories" do
    subject { post(api_v1_categories_path, params: params, headers: headers) }
    
    context "send correct category information" do
      let(:params) { { category: attributes_for(:category) } }
      let(:current_admin) { create(:admin) }
      let(:headers) { current_admin.create_new_auth_token }
      
      it "Category is created" do
        expect { subject }.to change { Category.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end
  
  describe "GET /api/v1/categories" do
    subject { get(api_v1_categories_path) }

    before do
      create_list(:category, 8)
    end

    it "get list of categories" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 8
      expect(res[0].keys).to eq ["id", "name", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end
  
  describe "GET /api/v1/categories/:id" do
    subject { get(api_v1_category_path(category_id)) }

    context "specified id exists" do
      let(:category) { create(:category) }
      let(:category_id) { category.id }
      
      it "get detail of category" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq category.id
        expect(res["name"]).to eq category.name
        expect(response).to have_http_status(200)
      end
    end
  end
  
  describe "PATCH /api/v1/categories/:id" do
    subject { patch(api_v1_category_path(category_id), params: params, headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:params) { { category: { name: Faker::Lorem.word, created_at: Time.current } } }
    let(:category_id) { category.id }
    let(:category) { create(:category) }
    
    it "category is updated" do
      expect { subject }.to change { category.reload.name }.from(category.name).to(params[:category][:name]) &
                            not_change { category.reload.created_at }
      expect(response).to have_http_status(200)
    end
  end
  
  describe "DELETE /api/v1/categories/:id" do
    subject { delete(api_v1_category_path(category_id), headers: headers) }
    
    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:category_id) { category.id }
    let!(:category) { create(:category) }
    
    it "category is deleted" do
      expect { subject }.to change { Category.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
