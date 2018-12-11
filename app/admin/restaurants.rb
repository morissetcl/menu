# frozen_string_literal: true

ActiveAdmin.register Restaurant do

  show do
    render partial: 'show', locals: { dishes: restaurant_menu.dishes, restaurant: restaurant }
  end

  controller do
    helper_method :restaurant_menu

    def restaurant_menu
      RestaurantMenu.find_by(restaurant: resource)
    end
  end
end
