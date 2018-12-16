# frozen_string_literal: true

class FormatAddressesService
  class << self
    def call(restaurant)
      @restaurant = restaurant
      @source = restaurant.source
      @address = restaurant.address
      return if need_to_be_update?
      return if restaurant.address.nil?

      fill_fields
    end

    private

    def fill_fields
      if @source == 'foodin'
        fill_address_column_cleanly_foodin
      elsif @source == 'restopolitain'
        fill_address_column_cleanly_restopolitain
      else
        fill_address_column_cleanly
      end
    end

    def retrieve_city(zip_code)
      address_split = @address.delete(zip_code).split(',')
      return address_split[-1] if @source == 'justeat'
      return address_split[1] if @source == 'deliveroo'

      ''
    end

    def fill_address_column_cleanly_foodin
      address_split = @address.split(',')
      zip_code = address_split[1].match(/(.*?)(\d+)/)[2]
      city = address_split[1].delete(zip_code)
      street = address_split.shift
      @restaurant.update(zip_code: zip_code, city: city.strip, street: street)
    end

    def fill_address_column_cleanly_restopolitain
      address_split = @address.split(',')
      zip_code = address_split.last.split[0]
      city = @address.split.last
      street = address_split.first(2).join
      @restaurant.update(zip_code: zip_code, city: city, street: street)
    end

    def fill_address_column_cleanly
      zip_code = @address.last(5).strip
      city = retrieve_city(zip_code).strip
      street = @address.split(',')[0].strip
      @restaurant.update(zip_code: zip_code, city: city.capitalize, street: street)
    end

    def need_to_be_update?
      restaurant = @restaurant
      restaurant.zip_code_changed? ||
        restaurant.city_changed? ||
        restaurant.street_changed?
    end
  end
end