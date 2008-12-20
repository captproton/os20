class CreateAssignedSections < ActiveRecord::Migration
  def self.up
    create_table :assigned_sections do |t|
      t.integer "article_id"
      t.integer "slot_id"
      t.integer "section_id"
      t.integer "position",   :default => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :assigned_sections
  end
end
