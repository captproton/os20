class AddUserName < ActiveRecord::Migration
  def self.up
    add_column :users, :first_name, :string, :limit => 80
    add_column :users, :last_name, :string, :limit => 80
  end

  def self.down
    remove_column :users, :first_name
    remove_column :users, :last_name
  end
end
