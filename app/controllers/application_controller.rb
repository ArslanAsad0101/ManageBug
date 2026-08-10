class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied, with: :handle_access_denied
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

  private

  def handle_access_denied(exception)
    @error_message = "You don't have permission to access this resource."
    @error_code = "Unauthorized Access"
    render :error, status: :forbidden, layout: "error"
  end

  def handle_not_found(exception)
    @error_message = "The resource you're looking for couldn't be found."
    @error_code = "Not Found"
    render :error, status: :not_found, layout: "error"
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :role, :phone_number])
    devise_parameter_sanitizer.permit(:account_update, keys: [:avatar, :name, :phone_number])
  end

  def after_sign_in_path_for(resource)
    projects_path
  end

  def after_sign_up_path_for(resource)
    projects_path
  end
end
