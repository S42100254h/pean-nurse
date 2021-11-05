require "rails_helper"

RSpec.describe "Api::V1::Choices", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/choices/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/choices/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/choices/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/choices/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/choices/destroy"
      expect(response).to have_http_status(:success)
    end
  end
end
