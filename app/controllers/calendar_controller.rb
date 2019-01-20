# frozen_string_literal: true

class CalendarController < ApplicationController
  layout false
  layout 'users'

  def index
    @events = Event.where(user_id: current_user.id)
    fresh_when(@events)
    render :index
  end
end
