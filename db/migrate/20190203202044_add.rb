class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :full_address, :string
  end
end
