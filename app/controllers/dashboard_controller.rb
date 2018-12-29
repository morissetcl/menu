# frozen_string_literal: true

class DashboardController < ApplicationController
  layout false
  layout 'users'

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    p authorized_departments
  end

  def recherche
    @restaurants = Restaurant.where(department: authorized_departments)
                             .ransack(name_or_address_cont: params[:q])
                             .result(distinct: true)
                             .page(params[:page])
  end

  private

  def authorized_departments
    Department.where(id: current_user.department_ids).pluck(:name)
  end

  def force_json
    request.format = :json
  end
end
