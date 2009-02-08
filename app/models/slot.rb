class Slot < ActiveRecord::Base
  
  acts_as_taggable_on :tags, :categories, :channels, :topics
  
  ##has_many :discussions, :as => :publication
  has_many :remarks
  belongs_to :user
  
  
  validates_presence_of :title, :user_id
  searchable_by :title, :body, :excerpt 
  ## belongs_to :user
 
 def self.paginated_search(search,page)
   
  paginate :per_page => 2,:page => page,
            :conditions => ['title like ?', "%#{search}%"],
            :order => 'title'
 end
 
  def new_remark_attributes=(remark_attributes)
    remark_attributes.each do |attributes| 
      remarks.build(attributes) 
    end 

  end 

  def find_remarks(slot_id)
    Remark.find_remarks_for_remarkable("Slot", slot_id)
  end
end