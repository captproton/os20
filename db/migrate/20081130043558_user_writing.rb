class UserWriting < ActiveRecord::Migration
  def self.up
      change_table      :users do |t|
          t.boolean      :admin, :default => false
          t.string      :activation_code,  :limit => 40
          t.datetime    :activated_at
          t.string :filter
          
          
      end

  end

  def self.down
      change_table      :users do |t|
         t.remove    :activation_code
         t.remove    :activated_at
         t.remove    :admin
         t.remove    :filter
       end
  end
end
