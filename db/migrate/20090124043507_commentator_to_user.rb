class CommentatorToUser < ActiveRecord::Migration
  def self.up
    rename_column :discussions, :commentator_id, :user_id
  end

  def self.down
    rename_column :discussions, :user_id, :commentator_id
  end
end
