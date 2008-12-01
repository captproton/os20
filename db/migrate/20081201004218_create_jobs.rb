class CreateJobs < ActiveRecord::Migration
  def self.up
    create_table :jobs do |t|
      t.user_id :integer
      t.job_fit_id :integer

      t.timestamps
    end
  end

  def self.down
    drop_table :jobs
  end
end
