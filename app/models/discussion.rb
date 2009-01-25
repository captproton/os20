class Discussion < ActiveRecord::Base
  belongs_to :article,  :class_name => "Article",
                        :foreign_key => "remarkable_id"
  
  belongs_to :slot,     :class_name => "Slot",
                        :foreign_key => "remarkable_id"
  belongs_to :article,  :class_name => "Article",
                        :foreign_key => "remarkable_id"
  belongs_to :user
  

 
  # validates_presence_of :context ## for possible use after basic commenting is established
  
  def remarkable
    self.articles + self.slots
  end
  
end
