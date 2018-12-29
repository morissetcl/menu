# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    dashboard_path resource
  end

  def after_sign_up_path_for(resource)
    after_sign_in_path_for(resource)
  end
end
