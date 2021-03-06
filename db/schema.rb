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

ActiveRecord::Schema.define(:version => 20090124205139) do

  create_table "articles", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "permalink"
    t.text     "excerpt"
    t.text     "body"
    t.datetime "published_at"
    t.integer  "comment_age",  :default => 0
    t.string   "filter"
    t.string   "user_agent"
    t.string   "referrer"
    t.integer  "assets_count", :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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

  create_table "assigned_sections", :force => true do |t|
    t.integer  "article_id"
    t.integer  "slot_id"
    t.integer  "section_id"
    t.integer  "position",   :default => 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "discussions", :force => true do |t|
    t.integer  "remark_id"
    t.integer  "publication_id",                 :default => 0,  :null => false
    t.string   "publication_type", :limit => 15, :default => "", :null => false
    t.integer  "user_id",                        :default => 0
    t.string   "commentator_type"
    t.string   "context"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "remarks", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "remarkable_id",   :default => 0,  :null => false
    t.string   "remarkable_type", :default => "", :null => false
    t.integer  "user_id",         :default => 0,  :null => false
  end

  add_index "remarks", ["user_id"], :name => "index_remarks_on_user_id"

  create_table "sections", :force => true do |t|
    t.string   "name"
    t.boolean  "show_paged_articles",               :default => false
    t.integer  "articles_per_page",                 :default => 15
    t.string   "layout"
    t.string   "template"
    t.integer  "site_id"
    t.string   "path"
    t.integer  "articles_count",                    :default => 0
    t.string   "archive_path"
    t.string   "archive_template"
    t.string   "type",                :limit => 20
    t.integer  "position",                          :default => 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "slots", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "permalink"
    t.text     "excerpt"
    t.text     "body"
    t.datetime "published_at"
    t.integer  "comment_age"
    t.string   "filter"
    t.string   "user_agent"
    t.string   "referrer"
    t.integer  "assets_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "taggable_type"
    t.string   "context"
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", :force => true do |t|
    t.string "name"
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
    t.string   "first_name",                :limit => 80
    t.string   "last_name",                 :limit => 80
  end

end
