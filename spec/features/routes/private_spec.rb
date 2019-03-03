require 'spec_helper'

feature 'Private Navigation', js: true do
  before { sign_as_user }

  scenario 'coucou', :focus do
    expect(page).to have_content 'Recherche par nom ou adresse'
  end
end
