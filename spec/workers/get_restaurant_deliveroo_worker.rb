module Deliveroo
  class GetRestaurant
    class << self
      def call
        ADRESSES.each do |a|
          url = "https://deliveroo.fr/fr/restaurants/paris/#{a}"
          p url
          sleep 5
          html_file = open(url).read
          html_doc = Nokogiri::HTML(html_file)
          html_doc.search('.RestaurantsList-8608590270dc6ae3').each do |element|
            links = element.css('a')
            links.each do |restaurant|
              link = restaurant['href']
              link_clean = link.scan(/(?<=https:\/\/deliveroo.fr\/menu\/paris\/)(.*)(?=\?day=today&time=ASAP)/)
              p link_clean
              restaurant_slug = link_clean.flatten.join.split('/').last
              p restaurant_slug
              next if restaurant_slug.blank?

              restaurant_name = restaurant_slug.tr('-', ' ').humanize
              restaurant = Restaurant.create(name: restaurant_name,
                                             slug: restaurant_slug,
                                             source: 'deliveroo')
              next if restaurant.id.nil?
              GetRestaurantMenuDeliverooWorker.perform_async(link, restaurant_slug)
      end
    end
  end
end
