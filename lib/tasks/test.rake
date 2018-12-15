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
    link = 'https://www.resto-in.fr/livraison-a-domicile-paris'
    html_file = URI.parse(link).open
    ok = Nokogiri::HTML(html_file)
  end
end
