# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    before_action :ensure_nomal_user, only: :create

    # GET /resource/password/new
    # def new
    #   super
    # end

    # POST /resource/password
    # def create
    #   super
    # end

    # GET /resource/password/edit?reset_password_token=abcdef
    # def edit
    #   super
    # end

    # PUT /resource/password
    # def update
    #   super
    # end

    # protected

    def ensure_nomal_user
      redirect_to new_user_session_path, alert: 'ゲストユーザーのパスワード再設定はできません' if params[:user][:email].casecmp('guest@example.com').zero?
    end

    # def after_resetting_password_path_for(resource)
    #   super(resource)
    # end

    # The path used after sending reset password instructions
    # def after_sending_reset_password_instructions_path_for(resource_name)
    #   super(resource_name)
    # end
  end
end