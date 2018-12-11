# frozen_string_literal: true

ActiveAdmin.register Restaurant do

  filter :name
  filter :source
  filter :ville
  filter :address
  filter :created_at

  show do
    render partial: 'show', locals: { dishes: restaurant_menu.dishes.sort, restaurant: restaurant }
  end

  controller do
    helper_method :restaurant_menu

    def restaurant_menu
      RestaurantMenu.find_by(restaurant: resource)
    end
  end
end
