# frozen_string_literal: true

namespace :scrap do
  desc 'scrap restaurant'
  task test: :environment do
    link = 'https://deliveroo.fr/fr/menu/paris/3eme-temple/grazie?day=today&time=ASAP'
    html_file = URI.parse(link).open
    html_doc = Nokogiri::HTML(html_file)
  end

  desc 'scrap test'
  task alloresto: :environment do
    link = 'https://www.just-eat.fr/livraison/paris/paris/?page=1'
    html_file = URI.parse(link).open
    Nokogiri::HTML(html_file)
  end
end
