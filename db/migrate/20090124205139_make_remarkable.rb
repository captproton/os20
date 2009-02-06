class MakeRemarkable < ActiveRecord::Migration
  def self.up
    # make remarks more like acts_as_commentable
    add_column :remarks, :remarkable_id, :integer,  :default => 0,  :null => false
    add_column :remarks, :remarkable_type, :string, :default => "", :null => false
    add_column :remarks, :user_id, :integer,        :default => 0,  :null => false
    
    add_index :remarks, :user_id
    
    # take remarks out of discussions
    rename_column :discussions, :remarkable_type, :publication_type
    rename_column :discussions, :remarkable_id, :publication_id
    
  end

  def self.down
    rename_column :discussions, :publication_id, :remarkable_id
    rename_column :discussions, :publication_type, :remarkable_type
    
    remove_index :remarks, :user_id

    remove_column :remarks, :user_id
    remove_column :remarks, :remarkable_type
    remove_column :remarks, :remarkable_id
    
  end
end
