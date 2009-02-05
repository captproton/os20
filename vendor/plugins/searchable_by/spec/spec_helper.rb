require 'rubygems'
require 'spec'
require 'active_record'

dir = File.dirname(__FILE__)

unless defined? SortableBy
  require "#{dir}/../lib/searchable_by"
  require "#{dir}/../init.rb"
end

RAILS_ROOT = '' unless defined? RAILS_ROOT

# configuration of the test database environoment
$db_file = "#{dir}/db/test.sqlite3"
FileUtils.rm_rf($db_file)
ActiveRecord::Base.establish_connection(:adapter => "sqlite3", :database => $db_file)


# run mibrations
require "#{dir}/db/migrate/create_test_records.rb"
require "#{dir}/db/migrate/create_test_record_mates.rb"

ActiveRecord::Migration.verbose = false

CreateTestRecordsTable.migrate(:up)
CreateTestRecordMatesTable.migrate(:up)
