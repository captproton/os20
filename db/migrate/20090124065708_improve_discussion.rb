class ImproveDiscussion < ActiveRecord::Migration
  def self.up
    change_table :discussions do |t| 
      t.change :user_id, :integer, :default => 0
      t.change :remarkable_id, :integer, :default => 0, :null => false
      t.change :remarkable_type, :string, :limit => 15, :default => "", :null => false
      
    end
      
      
  end

  def self.down
    change_table :discussions do |t| 
    
      t.change :user_id, :integer
      t.change :remarkable_id, :integer
      t.change :remarkable_type, :string
    end
    
    
  end
end
