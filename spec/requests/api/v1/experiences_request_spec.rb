require "rails_helper"

RSpec.describe "Api::V1::Experiences", type: :request do
  describe "POST /api/v1/experiences" do
    subject { post(api_v1_experiences_path, params: params, headers: current_admin.create_new_auth_token) }

    context "send correct experience information" do
      let(:params) { { experience: attributes_for(:experience) } }
      let(:current_admin) { create(:admin) }

      it "Experience is created" do
        expect { subject }.to change { Experience.count }.by(1)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "GET /api/v1/experiences" do
    subject { get(api_v1_experiences_path) }

    before do
      create(:experience, level: 2, experience: 80)
      create(:experience, level: 3, experience: 120)
      create(:experience, level: 4, experience: 180)
    end

    it "gets experiences" do
      subject
      res = JSON.parse(response.body)
      expect(res.length).to eq 3
      expect(res[0].keys).to eq ["id", "level", "experience", "created_at", "updated_at"]
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /api/v1/experiences/:id" do
    subject { get(api_v1_experience_path(experience_id)) }

    context "specified id exists" do
      let(:experience) { create(:experience) }
      let(:experience_id) { experience.id }

      it "gets detail of experience" do
        subject
        res = JSON.parse(response.body)
        expect(res["id"]).to eq experience_id
        expect(res["level"]).to eq experience.level
        expect(res["experience"]).to eq experience.experience
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "PATCH /api/v1/experiences/:id" do
    subject { patch(api_v1_experience_path(experience_id), params: params, headers: current_admin.create_new_auth_token) }

    let(:current_admin) { create(:admin) }
    let(:params) { { experience: attributes_for(:experience, level: 2, experience: 120) } }
    let(:experience_id) { experience.id }
    let(:experience) { create(:experience) }

    it "experience is updated" do
      expect { subject }.to change { experience.reload.level }.from(experience.level).to(params[:experience][:level]) &
                            change { experience.reload.experience }.from(experience.experience).to(params[:experience][:experience])
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/v1/experience/:id" do
    subject { delete(api_v1_experience_path(experience_id), headers: current_admin.create_new_auth_token) }

    let(:current_admin) { create(:admin) }
    let(:experience_id) { experience.id }
    let!(:experience) { create(:experience) }

    it "experience is deleted" do
      expect { subject }.to change { Experience.count }.by(-1)
      expect(response).to have_http_status(200)
    end
  end
end
