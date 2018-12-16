# frozen_string_literal: true

ActiveAdmin.register Restaurant do
  filter :name
  filter :source, as: :select, collection: proc { Restaurant.pluck(:source).uniq }
  filter :tags
  filter :city
  filter :zip_code
  filter :created_at

  index do
    column :name
    column :street
    column :zip_code
    column :city
    column :source
    column :address
    column :created_at
    actions
  end

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
