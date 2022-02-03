require "rails_helper"

RSpec.describe "Api::V1::Choices", type: :request do
  describe "POST /api/v1/choices" do
    subject { post(api_v1_choices_path, params: params, headers: headers) }

    context "send correct choice information" do
      let(:params) { { choice: attributes_for(:choice, quiz_id: quiz_id) } }
      let(:current_admin) { create(:admin) }
      let(:headers) { current_admin.create_new_auth_token }
      let(:quiz_id) { quiz.id }
      let(:quiz) { create(:quiz) }

      it "Choice is created" do
        expect { subject }.to change { Choice.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "GET /api/v1/choices?quiz_id=number" do
    subject { get(api_v1_choices_path, params: { quiz_id: quiz_id }) }

    before do
      create(:quiz, id: 1)
      create(:quiz, id: 2)
      create_list(:choice, 4, quiz_id: 1)
      create_list(:choice, 8, quiz_id: 2)
    end

    let(:quiz_id) { 1 }

    it "get list of choices which is related to quiz_id" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 4
      expect(res[0].keys).to eq ["id", "choice", "is_right", "quiz_id", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/choices/:id" do
    subject { get(api_v1_choice_path(choice_id)) }

    context "specified id exists" do
      let(:choice) { create(:choice) }
      let(:choice_id) { choice.id }

      it "get detail of choice" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq choice.id
        expect(res["choice"]).to eq choice.choice
        expect(res["is_right"]).to eq choice.is_right
        expect(response).to have_http_status(200)
      end
    end

    context "specified id does not exist" do
      let(:choice_id) { 99999 }

      it "can't get detail of choice" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "PATCH /api/v1/choices/:id" do
    subject { patch(api_v1_choice_path(choice_id), params: params, headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:params) { { choice: { choice: Faker::Lorem.word, is_right: false, created_at: Time.current } } }
    let(:choice_id) { choice.id }
    let(:choice) { create(:choice, is_right: true) }

    it "choice is updated" do
      expect { subject }.to change { choice.reload.choice }.from(choice.choice).to(params[:choice][:choice]) &
                            change { choice.reload.is_right }.from(choice.is_right).to(params[:choice][:is_right]) &
                            not_change { choice.reload.created_at }
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/choices/:id" do
    subject { delete(api_v1_choice_path(choice_id), headers: headers) }

    let(:headers) { current_admin.create_new_auth_token }
    let(:current_admin) { create(:admin) }
    let(:choice_id) { choice.id }
    let!(:choice) { create(:choice) }

    it "choice is deleted" do
      expect { subject }.to change { Choice.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
