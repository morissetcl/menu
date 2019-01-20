# frozen_string_literal: true

class CalendrierController < ApplicationController
  layout false
  layout 'users'

  def index
    @calendier = Restaurant.last
  end
end
