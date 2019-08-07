# frozen_string_literal: true

require 'rails_helper'

describe 'Admin - Team', type: :feature do
  let(:admin) { create :admin_user }
  let!(:manager) { create :user, role: 'manager', email: 'manager@email.com' }
  let!(:commercial) { create :user, role: 'commercial', email: 'commercial@email.com' }

  before do
    sign_in_as_admin admin
  end

  context  '#New Team' do
    before { visit new_admin_team_path }

    scenario 'Create a team' do
      expect do
        fill_in :team_name, with: 'Davigel'
        select 'manager@email.com'
        click_on 'Create Team'
      end.to change(Team, :count)
      expect(Team.last.reload.user).to eq manager
    end

    scenario 'Cannot select a commercial' do
      expect(page).to have_content 'manager@email.com'
      expect(page).to_not have_content 'commercial@email.com'
    end
  end

  context '#Show Team' do
    let!(:team) { create :team, name: 'Normandie' }
    let!(:manager) { create :user, role: 'manager', email: 'manager@email.com', team: team }
    let!(:commercial) do
      create :user, role: 'commercial', email: 'commercial@email.com', team: team
    end
    scenario do
      visit admin_team_path team
      expect(page).to have_content 'manager@email.com'
      expect(page).to have_content 'commercial@email.com'
    end
  end
end
