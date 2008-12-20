class CreateSections < ActiveRecord::Migration
  def self.up
    create_table :sections do |t|
      t.string  "name"
      t.boolean "show_paged_articles", :default => false
      t.integer "articles_per_page",   :default => 15
      t.string  "layout"
      t.string  "template"
      t.integer "site_id"
      t.string  "path"
      t.integer "articles_count",      :default => 0
      t.string  "archive_path"
      t.string  "archive_template"
      t.string   "type",           :limit => 20
      t.integer "position",            :default => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :sections
  end
end
