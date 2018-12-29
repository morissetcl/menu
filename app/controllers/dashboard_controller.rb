# frozen_string_literal: true

class DashboardController < ApplicationController
  layout 'users'
  before_action :authenticate_user!
  load_and_authorize_resource

  def index; end

  def recherche
    @restaurants = Restaurant.ransack(name_or_address_cont: params[:q])
                             .result(distinct: true).page params[:page]
  end

  private

  def force_json
    request.format = :json
  end
end
