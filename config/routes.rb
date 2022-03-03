Rails.application.routes.draw do
  namespace "api", format: "json" do
    namespace "v1" do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }
      mount_devise_token_auth_for "Admin", at: "admin"
      get "users/currentuser"
      get "admins/currentadmin"
      patch "users/levelup"
      resources :users, only: [:show, :index, :update, :destroy]
      resources :quizzes
      resources :categories
      resources :category_profiles
      resources :choices
      resources :commentaries
      resources :experiences
      post "inquiries/create"
      get "quizzes/exam/:category_profile_uid/:exam_id", to: "quizzes#exam_index", as: "exam_quizzes"
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
