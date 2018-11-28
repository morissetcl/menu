require 'scraps/restaurant_name_deliveroo'
require 'scraps/restaurant_menu_deliveroo'

namespace :scrap do
  desc "scrap restaurant name"
  task :restaurant_name_deliveroo => :environment do
    Scraps::RestaurantNameDeliveroo.get_name
  end

  desc "scrap restaurant menu"
  task :restaurant_menu_deliveroo => :environment do
    Scraps::RestaurantMenuDeliveroo.get_menu
  end
end
