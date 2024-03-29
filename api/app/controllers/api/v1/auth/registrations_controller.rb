class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      params.permit(:name, :email, :image, :password, :password_confirmation)
    end

    def account_update_params
      params.permit(:name, :email, :image, :current_password, :password, :password_confirmation)
    end
end
