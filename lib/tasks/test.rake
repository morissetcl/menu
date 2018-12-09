namespace :scrap do
  desc "scrap restaurant"
  task :test => :environment do
    link = 'https://deliveroo.fr/fr/menu/paris/3eme-temple/grazie?day=today&time=ASAP'
    html_file = URI.parse(link).open
    html_doc = Nokogiri::HTML(html_file)

    p html_doc.css('.menu-index-page__item-price').text.to_i
  end
end
