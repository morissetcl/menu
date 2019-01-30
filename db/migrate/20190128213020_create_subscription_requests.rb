class CreateSubscriptionRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :subscription_requests do |t|
      t.string :last_name
      t.string :first_name
      t.string :company
      t.string :email
      t.string :prospecting_area

      t.timestamps
    end
  end
end
