class AddColumnsToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :city, :string
    add_column :restaurants, :zip_code, :integer
    add_column :restaurants, :street, :string
  end
end
