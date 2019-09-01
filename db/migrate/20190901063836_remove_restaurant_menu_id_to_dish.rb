class RemoveRestaurantMenuIdToDish < ActiveRecord::Migration[5.2]
  def change
    remove_column :dishes, :restaurant_menu_id
  end
end
