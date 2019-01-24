# frozen_string_literal: true

class CalendarController < ApplicationController
  layout false
  layout 'private'

  def index
    @events = Event.where(user_id: current_user.id)
    render :index
  end
end
