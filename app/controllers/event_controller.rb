# frozen_string_literal: true

class EventController < ApplicationController
  layout false
  layout 'users'

  def create
    event = Event.create(event_params)
    render json: event
  end

  private

  def get_user
    User.find(params[:user_id])
  end

  def event_params
    params.require(:event).permit(:id, :user_id, :restaurant_id, :title, :start_date, :end_date)
  end
end
