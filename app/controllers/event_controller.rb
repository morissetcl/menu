# frozen_string_literal: true

class EventController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout false
  layout 'users'

  def create
    p params
    event = Event.create!(event_params)
    render json: event
  end

  private

  def get_user
    User.find(params[:user_id])
  end

  def event_params
    params.require(:event).permit(:id, :user_id, :restaurant_id, :date, :title)
  end
end
