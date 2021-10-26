Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "inquiries/create"
    end
  end
  namespace "api", format: "json" do
    namespace "v1" do
      mount_devise_token_auth_for "User", at: "auth", controllers: {

  mount_devise_token_auth_for 'Admin', at: 'auth'
  as :admin do
    # Define routes for Admin within this block.
  end
        registrations: "api/v1/auth/registrations",
      }
      get "users/currentuser"
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
