# frozen_string_literal: true

class ApplicationController < ActionController::Base
  layout 'homepage'

  def after_sign_in_path_for(resource)
    user_dashboard_index_path resource
  end

  def after_sign_up_path_for(resource)
    after_sign_in_path_for(resource)
  end
end
