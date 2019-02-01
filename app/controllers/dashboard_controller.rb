# frozen_string_literal: true

class DashboardController < ApplicationController
  layout false
  layout 'private'

  before_action :authenticate_user!
  load_and_authorize_resource

  def index; end

  def restaurant
    @restaurant = Restaurant.find params[:id]
  end

  def recherche
    @restaurants = Restaurant.where(department: authorized_departments)
                             .ransack(name_or_address_cont: params[:q])
                             .result(distinct: true)
                             .page(params[:page])
    fresh_when(@restaurants)
  end

  private

  def authorized_departments
    Department.where(id: current_user.department_ids)
              .pluck(:name)
  end

  def force_json
    request.format = :json
  end
end
