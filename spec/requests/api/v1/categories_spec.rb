require "rails_helper"

RSpec.describe "Api::V1::Categories", type: :request do
  describe "POST /api/v1/categories" do
    subject { post(api_v1_categories_path, params: params, headers: headers) }

    context "send correct category information" do
      let(:params) { attributes_for(:category, quiz_ids: quiz_ids) }
      let(:current_admin) { create(:admin) }
      let(:headers) { current_admin.create_new_auth_token }
      let!(:quiz_ids) { quiz.id }
      let!(:quiz) { create(:quiz) }

      it "Category and CategoryQuizRelation are created" do
        expect { subject }.to change { Category.count }.by(1) &
                              change { CategoryQuizRelation.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end

    context "send correct category information without quiz_ids" do
      let(:params) { attributes_for(:category) }
      let(:current_admin) { create(:admin) }
      let(:headers) { current_admin.create_new_auth_token }

      it "Category is created" do
        expect { subject }.to change { Category.count }.by(1) &
                              change { CategoryQuizRelation.count }.by(0)
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
      expect(res[0].keys).to eq ["id", "name", "created_at", "updated_at", "image", "caption", "uid"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/categories?quiz_id=number" do
    subject { get(api_v1_categories_path, params: { quiz_id: quiz_id }) }

    before do
      create(:quiz, id: 1)
      create(:quiz, id: 2)
      create(:category, id: 1)
      create(:category, id: 2)
      create(:category, id: 3)
      create(:category_quiz_relation, quiz_id: 1, category_id: 1)
      create(:category_quiz_relation, quiz_id: 1, category_id: 2)
      create(:category_quiz_relation, quiz_id: 2, category_id: 1)
    end

    let(:quiz_id) { 1 }

    it "gets categories which are related to quiz_id" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 2
      expect(res[0]["id"]).to eq 1
      expect(res[1]["id"]).to eq 2
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/categories/:id" do
    subject { get(api_v1_category_path(category_id)) }

    context "specified id exists" do
      let(:category) { create(:category) }
      let(:category_id) { category.id }

      it "gets detail of category" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq category.id
        expect(res["name"]).to eq category.name
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "PATCH /api/v1/categories/:id" do
    subject { patch(api_v1_category_path(category_id), params: params, headers: current_admin.create_new_auth_token) }

    let(:current_admin) { create(:admin) }
    let(:params) { { name: Faker::Lorem.word, created_at: Time.current } }
    let(:category_id) { category.id }
    let(:category) { create(:category) }

    it "category is updated" do
      expect { subject }.to change { category.reload.name }.from(category.name).to(params[:name]) &
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
