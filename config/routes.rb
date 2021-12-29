Rails.application.routes.draw do
  namespace "api", format: "json" do
    namespace "v1" do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }
      mount_devise_token_auth_for "Admin", at: "admin"
      get "users/currentuser"
      get "admins/currentadmin"
      resources :users, only: [:show, :index, :destroy]
      resources :quizzes
      resources :categories
      resources :choices, only: [:show, :create, :update, :destroy]
      get "choices/index/:quiz_id", to: "choices#index"
      post "inquiries/create"
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
