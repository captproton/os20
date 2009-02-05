class CreateTestRecordMatesTable < ActiveRecord::Migration
  def self.up
    create_table "test_record_mates", :force => true do |t|
      t.string :name
    end
  end
  
  def self.down
    drop_table "test_record_mates"
  end
end
