class AddDepartmentToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :department, :string
  end
end
