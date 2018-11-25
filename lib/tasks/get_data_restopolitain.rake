require 'scraps/menu_restaurant_restopolitain'
require 'scraps/restaurant_restopolitain'
require 'scraps/regions_restopolitain'

namespace :scrap do
  desc "scrap restaurant"
  task :restaurant_restopolitain => :environment do
    Scraps::RestaurantRestopolitain.get_restaurant
  end

  desc "scrap menu"
  task :menu_restaurant_restopolitain => :environment do
    Scraps::MenuRestaurantRestopolitain.get_menu
  end

  desc "scrap region"
  task :regions_restopolitain => :environment do
    Scraps::RegionsRestopolitain.get_region
  end
end
