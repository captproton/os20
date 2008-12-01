class CreateContents < ActiveRecord::Migration
  def self.up
    create_table :contents do |t|
        t.integer  "article_id"
        t.integer  "user_id"
        t.string   "title"
        t.string   "permalink"
        t.text     "excerpt"
        t.text     "body"
        t.text     "excerpt_html"
        t.text     "body_html"
        t.datetime "published_at"
        t.string   "type",           :limit => 20
        t.string   "author",         :limit => 100
        t.string   "author_url"
        t.string   "author_email"
        t.string   "author_ip",      :limit => 100
        t.integer  "comments_count",                :default => 0
        t.integer  "updater_id"
        t.integer  "version"
        t.integer  "site_id"
        t.boolean  "approved",                      :default => false
        t.integer  "comment_age",                   :default => 0
        t.string   "filter"
        t.string   "user_agent"
        t.string   "referrer"
        t.integer  "assets_count",                  :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :contents
  end
end
