# frozen_string_literal: true

require 'rails_helper'

describe 'User', type: :integration do
  attr_reader :user

  context 'assign role as' do
    before { @user = create :user }

    it 'commercial' do
      user.commercial!
      expect(user.role).to eq 'commercial'
    end

    it 'manager' do
      user.manager!
      expect(user.role).to eq 'manager'
    end
  end
end
