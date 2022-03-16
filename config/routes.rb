Rails.application.routes.draw do
  namespace "api", format: "json" do
    namespace "v1" do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }
      mount_devise_token_auth_for "Admin", at: "admin"
      get "admins/currentadmin"
      post "inquiries/create"
      get "users/currentuser"
      patch "users/add_exp"
      patch "users/level_up"
      get "quizzes/exam/:category_profile_uid/:exam_id", to: "quizzes#exam_index", as: "exam_quizzes"
      resources :badges
      resources :categories
      resources :category_profiles
      resources :choices
      resources :commentaries
      resources :experiences
      resources :quizzes
      resources :stacks, only: [:index, :create]
      resources :users, only: [:show, :index, :update, :destroy]
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
