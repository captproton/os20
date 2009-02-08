class CreateDiscussions < ActiveRecord::Migration
  def self.up
    create_table :discussions do |t|
      t.integer   :remark_id #refers to remarks table
      # refers to the model that has the discussion
      t.integer   :remarkable_id #ID of model that has the discussion
      t.string    :remarkable_type #name of model that has the discussion
      # refers to the user model
      t.integer   :commentator_id #author of the remark
      t.string    :commentator_type # optional field for now, possibly the user role of the commentator
      # possibly a way to catagorize comments
      t.string    :context # optional field for now, possibly a way to group comments

      t.timestamps
    end
    
    ## add_index :discussions, :remark_id
    ## add_index :discussions, [:remarkable_id, :remarkable_type, :context]
    
  end

  def self.down
    drop_table :discussions
  end
end
