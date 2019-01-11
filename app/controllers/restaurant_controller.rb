# frozen_string_literal: true

class RestaurantController < ApplicationController
  layout false
  layout 'users'

  def show
    @restaurant = Restaurant.find params[:id]
    @dishes = @restaurant.dishes.reverse
    @current_user_id = current_user.id
    render :show
  end
end
