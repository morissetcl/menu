class Restaurant < ApplicationRecord
  validates :name, :slug, presence: true, uniqueness: true
  before_save :format_slug

  def format_slug
    name.parameterize
  end
end
