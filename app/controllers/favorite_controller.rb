# frozen_string_literal: true

class FavoriteController < ApplicationController
  layout false
  layout 'users'

  def index
    @favorites = Restaurant.first
  end
end
