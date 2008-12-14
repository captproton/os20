# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20081130043558) do

  create_table "assets", :force => true do |t|
    t.string   "filename"
    t.integer  "width"
    t.integer  "height"
    t.string   "content_type"
    t.integer  "size"
    t.string   "attachable_type"
    t.integer  "attachable_id"
    t.datetime "updated_at"
    t.datetime "created_at"
    t.string   "thumbnail"
    t.integer  "parent_id"
  end

  create_table "contents", :force => true do |t|
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
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "email"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "last_login_at"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.integer  "visits_count",                            :default => 0
    t.string   "time_zone",                               :default => "Etc/UTC"
    t.string   "permalink"
    t.boolean  "admin",                                   :default => false
    t.string   "activation_code",           :limit => 40
    t.datetime "activated_at"
    t.string   "filter"
  end

end
