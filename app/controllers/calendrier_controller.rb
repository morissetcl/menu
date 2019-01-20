# frozen_string_literal: true

class CalendrierController < ApplicationController
  layout false
  layout 'users'

  def index
    @events = Event.where(user_id: current_user.id)
    render :index
  end
end
