# frozen_string_literal: true

class WorkArea < ApplicationRecord
  belongs_to :user
  belongs_to :department
end
