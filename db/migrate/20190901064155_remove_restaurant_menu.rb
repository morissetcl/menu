class RemoveRestaurantMenu < ActiveRecord::Migration[5.2]
  def change
    drop_table :restaurant_menus
  end
end
