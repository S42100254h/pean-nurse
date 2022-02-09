require "rails_helper"

RSpec.describe "Api::V1::Commentaries", type: :request do
  describe "POST /api/v1/commentaries" do
    subject { post(api_v1_commentaries_path, params: params, headers: headers) }

    describe "normal scenario" do
      context "send correct commentary information" do
        let(:params) { { commentary: attributes_for(:commentary, quiz_id: quiz_id) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let(:quiz_id) { quiz.id }
        let(:quiz) { create(:quiz) }

        it "Commentary is created" do
          expect { subject }.to change { Commentary.count }.by(1)
          expect(response).to have_http_status(200)
        end
      end
    end
  
    describe "exception scenario" do
      context "send commentary information with noexistent quiz id" do
        let(:params) { { commentary: attributes_for(:commentary, quiz_id: quiz_id) } }
        let(:current_admin) { create(:admin) }
        let(:headers) { current_admin.create_new_auth_token }
        let(:quiz_id) { 999999 }

        it "Commentary is not created" do
          expect { subject }.to raise_error ActiveRecord::RecordInvalid
        end
      end
    end
  end

  describe "GET /api/v1/commentaries" do
    subject { get(api_v1_commentaries_path) }

    before do
      create_list(:commentary, 8)
    end

    it "get list of commentaries" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 8
      expect(res[0].keys).to eq ["id", "text", "quiz_id", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET api/v1/commentaries/:id" do
    subject { get(api_v1_commentary_path(commentary_id)) }

    context "specified id exists" do
      let(:commentary) { create(:commentary) }
      let(:commentary_id) { commentary.id }

      it "get detail of commentary" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq commentary.id
        expect(res["text"]).to eq commentary.text
        expect(response).to have_http_status(200)
      end
    end

    context "specified id does not exist" do
      let(:commentary_id) { 999999 }

      it "can't get detail of commentary" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end
end
