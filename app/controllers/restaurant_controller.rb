# frozen_string_literal: true

class RestaurantController < ApplicationController
  layout false
  layout 'private'

  def show
    @restaurant = Restaurant.find params[:id]
    @dishes = @restaurant.dishes.reverse
    if_current_user
    render :show
  end

  private

  def if_current_user
    return if current_user.nil?

    @current_user_id = current_user.id
    favorite
    booked
  end

  def favorite
    @favorite = Favorite.find_by(user_id: @current_user_id, restaurant_id: @restaurant.id).present?
  end

  def booked
    @is_booked = Event.find_by(user_id: @current_user_id, restaurant_id: @restaurant.id).present?
  end
end
