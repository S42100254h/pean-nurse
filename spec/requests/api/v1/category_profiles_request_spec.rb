require 'rails_helper'

RSpec.describe "Api::V1::CategoryProfiles", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/category_profiles/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/category_profiles/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/category_profiles/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/category_profiles/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/category_profiles/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
