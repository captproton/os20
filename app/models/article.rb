class Article < ActiveRecord::Base
  ##has_many :discussions, :as => :publication
  has_many :discussions, :as => :publication
  has_many :remarks
  
end
