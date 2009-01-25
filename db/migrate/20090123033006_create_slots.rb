class CreateSlots < ActiveRecord::Migration
  def self.up
    create_table :slots do |t|
      t.integer :user_id
      t.string :title
      t.string :permalink
      t.text :excerpt
      t.text :body
      t.text :excerpt
      t.text :body
      t.datetime :published_at
      t.integer :comment_age
      t.string :filter
      t.string :user_agent
      t.string :referrer
      t.integer :assets_count

      t.timestamps
    end
  end

  def self.down
    drop_table :slots
  end
end
