# frozen_string_literal: true

class RestaurantController < ApplicationController
  layout false
  layout 'users'

  def show
    @restaurant = Restaurant.find params[:id]
    @dishes = @restaurant.dishes.reverse
    @current_user_id = current_user.id
    @favorite = Favorite.find_by(user_id: @current_user_id, restaurant_id: @restaurant.id).present?
    @is_booked = Event.find_by(user_id: @current_user_id, restaurant_id: @restaurant.id).present?
    render :show
  end
end
