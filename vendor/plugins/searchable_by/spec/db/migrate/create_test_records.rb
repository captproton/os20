class CreateTestRecordsTable < ActiveRecord::Migration
  def self.up
    create_table "test_records", :force => true do |t|
      t.string :title
      t.string :code
      t.string :code_i
      t.string :path
      t.string :host
      
      t.integer :test_record_mate_id
    end
  end
  
  def self.down
    drop_table "test_records"
  end
end
