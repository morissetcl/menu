# frozen_string_literal: true

class UserController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def show; end
end
