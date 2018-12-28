class CreateDepartments < ActiveRecord::Migration[5.2]
  def change
    create_table :departments do |t|
      t.string :zip_code
      t.string :name
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
