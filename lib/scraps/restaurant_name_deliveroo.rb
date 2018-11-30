# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantNameDeliveroo
    class << self
      def get_name
        adresses = ['5eme-jardin-des-plantes', '6eme-luxembourg', 'invalides',
                    '8eme-madeleine', '9eme-opera', 'paris-10eme-gare-de-lest', '11eme-oberkampf', 'vincennes-chateau', '13eme-place-ditalie', '14eme-mouton-duvernet', 'Vaugirard', 'Auteuil', 'la-fourche', '18eme-poissionniers', '19eme-jaures', 'porte-de-montreuil', 'saint-cloud-centre-ville', 'paris-la-defense', 'courbevoie-centre', 'chatillon-centre-ville', 'le-kremlin-bicetre', 'creteil-prefecture', 'rueil-malmaison-martinets-gare', 'argenteuil-centre-ville', 'boulogne-billancourt']

        adresses.each do |a|
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

              p restaurant
              Scraps::RestaurantMenuDeliveroo.get_menu(link, restaurant)
            end
          end
        end
      end
    end
  end
end
