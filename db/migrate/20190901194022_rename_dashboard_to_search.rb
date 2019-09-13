class RenameDashboardToSearch < ActiveRecord::Migration[5.2]
  def change
    rename_table :dashboards, :searches
  end
end
