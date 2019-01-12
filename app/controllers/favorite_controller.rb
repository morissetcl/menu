# frozen_string_literal: true

class FavoriteController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout false
  layout 'users'

  def index
    restaurant_ids = Favorite.where(user: current_user).pluck(:restaurant_id)
    @favorites = Restaurant.where(id: restaurant_ids)
    render :index
  end

  def create
    favorite = Favorite.create(favorite_params)
    render json: favorite
  end

  private

  def favorite_params
    params.require(:favorite).permit(:id, :user_id, :restaurant_id)
  end
end
