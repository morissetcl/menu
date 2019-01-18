# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }

# Checks for pending migrations and applies them before tests are run.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end
RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/support"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true
  config.mock_with :mocha

  config.run_all_when_everything_filtered = true
  config.filter_run :focus
  config.filter_run_excluding :slow
  config.include Devise::Test::IntegrationHelpers, type: :request
  config.render_views = true

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
  config.filter_run_when_matching :focus
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :active_record
    with.library :rails
  end
end

RSpec::Sidekiq.configure do |config|
  # Clears all job queues before each example
  config.clear_all_enqueued_jobs = true # default => true
  config.enable_terminal_colours = true # default => true
  config.warn_when_jobs_not_processed_by_sidekiq = true # default => true
end

def sign_in_as_admin(admin)
  visit admin_user_session_path
  fill_in :admin_user_email, with: admin.email
  fill_in :admin_user_password, with: admin.password
  click_on 'Login'
end

def sign_as_user
  visit new_user_session_path
  within find('#test1') do
    fill_in :user_email, with: 'albert@email.fr'
    fill_in :user_password, with: 'password'
    fill_in :user_password_confirmation, with: 'password'
    click_on "S'inscrire"
  end
end

Geocoder.configure(lookup: :test)

addresses = [
  '1 impasse de la Gaité, Paris, 75014',
  '1 Avenue du Dr Jean Mac, 72100 Le Mans, France',
  '1, place Jean Jaurès, 81100 Castres',
  '17 chemin de Ghesles 59700 Marcq-en-Barœul',
  "2 ruelle d'Ascq 59650 Villeneuve-d'Ascq",
  'Calle de Minerva, 11, 08006 Barcelona',
  '64b Rue Jean Jaurès, NOISY LE SEC 93130',
  '23 rue Dunkerque 75010 Paris',
  '43 Rue des Bruyères, LES LILAS 93260',
  '2 place de Rouen 76000 Rouen',
  '18 Quai de la Tourelle 95000 Cergy',
  '163 Avenue Jean Jaurès, AUBERVILLIERS 93300',
  '34 Rue Notre Dame de Recouvrance, 45000 Orléans, France',
  '4 Avenue de Verdun, ROMAINVILLE 93230',
  'Sous Le Pont De Fresnes, Entre Villey Saint Etienne et Liverdun 54200 Villey-Saint-Étienne',
  '180 Avenue du Général Leclerc, PANTIN 93500',
  '262 Rue Sainte Catherine 33000 Bordeaux',
  '25 allée Antoine Pinay - chemin de Halage, La Barthelasse 84000 Avignon',
  '16B Rue Floréal, BAGNOLET 93170',
  '23 Rue Louise Michel, BAGNOLET 93170',
  '22 rue Cambacérès 75008 Paris',
  '22 Boulevard Rouget de Lisle, MONTREUIL 93100',
  '167 Boulevard de la Boissière, MONTREUIL 93100',
  '55 Rue Sadi Carnot, BAGNOLET 93170',
  'Le Faubourg, rue Olympe de Gouges 60740 Saint-Maximin',
  '110 avenue Jean-Baptiste Clément 92100 Boulogne-Billancourt',
  "10 Place de l'Hôtel de Ville 02100 Saint-Quentin",
  '2 rue Léon Bancal 13011 Marseille',
  '225 rue Faubourg Saint Honoré 75008 Paris',
  '33, boulevard du Maréchal-Foch Angers 49100 Angers',
  '19 rue de miromesnil 75008 Paris',
  '18 Quai de Rive Neuve 13007 Marseille',
  '2 Place de la Gare 59380 Bergues',
  '142 avenue Pierre Mendes 13008 Marseille',
  '117 rue de Claye 77400 Thorigny-sur-Marne',
  '5 rue du Teinturin 33970 Lège-Cap-Ferret',
  '660 avenue du Général de Gaulle 59910 Bondues',
  '1 Avenue Gabriel Péri, MONTREUIL 93100'
]

addresses.each do |adresse|
  Geocoder::Lookup::Test.add_stub(
    adresse, [
      {
        'latitude' => 40.7143528,
        'longitude' => -74.0059731,
        'address' => 'New York, NY, USA',
        'state' => 'New York',
        'state_code' => 'NY',
        'country' => 'United States',
        'country_code' => 'US'
      }
    ]
  )
end
