# frozen_string_literal: true

class EventController < ApplicationController
  skip_before_action :verify_authenticity_token

  layout 'private'

  def create
    event = Event.create!(event_params)
    render json: event
  end

  private

  def event_params
    params.require(:event).permit(:title, :id, :user_id, :restaurant_id, :date)
  end
end
