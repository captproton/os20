class Remark < ActiveRecord::Base
  belongs_to :remarkable, :polymorphic => true
  
  # NOTE: install the acts_as_votable plugin if you 
  # want user to vote on the quality of remarks.
  #acts_as_voteable
  
  # Also note:  you may notice many similarities to acts_as_commentable.  I have re-created the plugin as a model
  # so that I better understand it innner workings, instead of just installing it and staying ignorant of how it
  # functions.
  
  # NOTE: Remarks belong to a user
  belongs_to :user
  
  # Helper class method to lookup all remarks assigned
  # to all remarkable types for a given user.
  def self.find_remarks_by_user(user)
    find(:all,
      :conditions => ["user_id = ?", user.id],
      :order => "created_at DESC"
    )
  end
  
  # Helper class method to look up all remarks for 
  # remarkable class name and commentable id.
  def self.find_remarks_for_remarkable(remarkable_str, remarkable_id)
    find(:all,
      :conditions => ["remarkable_type = ? and remarkable_id = ?", remarkable_str, remarkable_id],
      :order => "created_at DESC"
    )
  end

  # Helper class method to look up a remarkable object
  # given the remarkable class name and id 
  def self.find_remarkable(remarkable_str, remarkable_id)
    remarkable_str.constantize.find(remarkable_id)
  end
end
