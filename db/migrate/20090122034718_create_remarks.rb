class CreateRemarks < ActiveRecord::Migration
  def self.up
    create_table :remarks do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end

  def self.down
    drop_table :remarks
  end
end
