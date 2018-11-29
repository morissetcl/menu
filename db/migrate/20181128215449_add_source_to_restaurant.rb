class AddSourceToRestaurant < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :source, :string
  end
end
