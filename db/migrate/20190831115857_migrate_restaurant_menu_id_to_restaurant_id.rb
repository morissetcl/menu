class MigrateRestaurantMenuIdToRestaurantId < ActiveRecord::Migration[5.2]
  def change
    Dish.find_each do |d|
      restaurant_menu = RestaurantMenu.find d.restaurant_menu_id
      d.restaurant_id = restaurant_menu.restaurant_id
      d.save(validate: false)
      p d
    end
  end
end
