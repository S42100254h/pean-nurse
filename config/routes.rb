Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :quizzes
    end
  end
  namespace :api do
    namespace :v1 do
      post "inquiries/create"
    end
  end
  namespace "api", format: "json" do
    namespace "v1" do
      mount_devise_token_auth_for "User", at: "auth", controllers: {

        registrations: "api/v1/auth/registrations",
      }
      get "users/currentuser"
      get "admins/currentadmin"
      mount_devise_token_auth_for "Admin", at: "admin"
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
