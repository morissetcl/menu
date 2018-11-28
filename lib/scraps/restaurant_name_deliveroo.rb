require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantNameDeliveroo
    class << self
      def get_name
        adresses = ['5eme-jardin-des-plantes','6eme-luxembourg', 'invalides',
        '8eme-madeleine', '9eme-opera', 'paris-10eme-gare-de-lest', '11eme-oberkampf','vincennes-chateau', '13eme-place-ditalie','14eme-mouton-duvernet', 'Vaugirard', 'Auteuil', 'la-fourche', '18eme-poissionniers', "19eme-jaures", "porte-de-montreuil"]

        adresses.each do |a|
          url = "https://deliveroo.fr/fr/restaurants/paris/#{a}"
          p url
          sleep 5
          html_file = open(url).read
          html_doc = Nokogiri::HTML(html_file)
          html_doc.search('.RestaurantsList-8608590270dc6ae3').each do |element|
            links = element.css("a")
            links.each do |restaurant|
              link = restaurant['href']
              link_clean = link.scan(/(?<=https:\/\/deliveroo.fr\/menu\/paris\/)(.*)(?=\?day=today&time=ASAP)/)
              restaurant_slug = link_clean.flatten.join.split('/').last
              restaurant_name = restaurant_slug.gsub('-', ' ').humanize
              restaurant = Restaurant.create(name: restaurant_name,
                                             slug: restaurant_slug)
              Scraps::RestaurantMenuDeliveroo.get_menu(link, restaurant)
            end
          end
        end
      end
    end
  end
end
