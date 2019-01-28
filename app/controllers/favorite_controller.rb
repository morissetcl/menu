# frozen_string_literal: true

class FavoriteController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout false
  layout 'private'

  def index
    restaurant_ids = Favorite.where(user: retrieve_user).select(:restaurant_id)
    @favorites = Restaurant.where(id: restaurant_ids)
    render :index
  end

  def create
    favorite = Favorite.create(favorite_params)
    render json: favorite
  end

  def destroy
    favorite = Favorite.find_by(restaurant_id: params[:id],
                                user: retrieve_user)
    favorite.destroy
  end

  private

  def retrieve_user
    User.find(params[:user_id])
  end

  def favorite_params
    params.require(:favorite).permit(:id, :user_id, :restaurant_id)
  end
end
