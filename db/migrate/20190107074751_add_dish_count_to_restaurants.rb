class AddDishCountToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :dishes_count, :integer
  end
end
