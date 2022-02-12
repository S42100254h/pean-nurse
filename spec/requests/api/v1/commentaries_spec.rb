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
          expect { subject }.to raise_error ActiveRecord::RecordNotFound
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

  describe "GET /api/v1/commentaries?quiz_id=number" do
    before do
      create(:quiz, id: 1)
      create(:quiz, id: 2)
      create(:quiz, id: 3)
      create(:commentary, quiz_id: 1)
      create(:commentary, quiz_id: 2)
      create(:commentary, quiz_id: 3)
    end

    context "with query parameter(string)" do
      subject { get(api_v1_commentaries_path, params: { quiz_id: quiz_id }) }

      let(:quiz_id) { 1 }
      let!(:commentary) { create(:commentary, quiz_id: quiz_id) }

      it "get commentary which is related to quiz_id" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "text", "quiz_id", "created_at", "updated_at"]
        expect(res["quiz_id"]).to eq quiz_id
        expect(response).to have_http_status(200)
      end
    end

    context "with query parameters(array)" do
      subject { get(api_v1_commentaries_path, params: { quiz_id: [quiz_id, quiz_id2] }) }

      let(:quiz_id) { 1 }
      let(:quiz_id2) { 2 }

      it "gets list of commentaries which is related to quiz_id & quiz_id2" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 2
        expect(res[0].keys).to eq ["id", "text", "quiz_id", "created_at", "updated_at"]
        expect(res[0]["quiz_id"]).to eq quiz_id
        expect(res[1]["quiz_id"]).to eq quiz_id2
        expect(response).to have_http_status(200)
      end
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

  describe "PATCH /api/v1/commentaries/:id" do
    subject { patch(api_v1_commentary_path(commentary_id), params: params, headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:params) { { commentary: { text: Faker::Lorem.sentence, created_at: Time.current } } }
    let(:commentary_id) { commentary.id }
    let(:commentary) { create(:commentary) }

    it "commentary is updated" do
      expect { subject }.to change { commentary.reload.text }.from(commentary.text).to(params[:commentary][:text]) &
                            not_change { commentary.reload.created_at }
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/commentaries/:id" do
    subject { delete(api_v1_commentary_path(commentary_id), headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:commentary_id) { commentary.id }
    let!(:commentary) { create(:commentary) }

    it "commentary is deleted" do
      expect { subject }.to change { Commentary.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
