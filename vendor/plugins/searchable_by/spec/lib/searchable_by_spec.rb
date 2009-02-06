require File.dirname(__FILE__) + "/../spec_helper"

class TestRecord < ActiveRecord::Base
  searchable_by :title
  
  searchable_by :code => :exact,
                :code_i => :exact_i,
                :method_name => :exact_like
  
  searchable_by :path => :begin,
                'method_name' => :which_begins_like
  
  searchable_by :host => :end,
                :method_name => :which_ends_like
  
  belongs_to :mate, :class_name => "TestRecordMate", :foreign_key => :test_record_mate_id
  
  searchable_by 'test_record_mates.name',
                :include => :mate,
                :order => 'test_record_mates.name ASC',
                :method_name => :with_mate_like
end

class TestRecordMate < ActiveRecord::Base
  has_many :test_records
end

describe TestRecord do 
  before :all do 
    TestRecord.destroy_all
  end
  
  describe "simple 'like' search" do
    before :all do
      @r1 = TestRecord.create :title => 'first record'
      @r2 = TestRecord.create :title => 'second record'
    end
   
    it "should find both records by 'record' string" do 
      TestRecord.like('recor').should == [@r1, @r2]
    end
    
    it "should find the first record only by 'first' string" do 
      TestRecord.like('firs').should == [@r1]
    end
    
    it "should find the second recod only by 'second' string" do 
      TestRecord.like('sec').should == [@r2]
    end
  end
  
  describe "exact search" do 
    before :all do 
      @r1 = TestRecord.create :code => 'ASDF', :code_i => 'zxcv'
      @r2 = TestRecord.create :code => 'asdf', :code_i => 'ZXCV'
    end
    
    it "should find both record by case insensitive code" do 
      TestRecord.exact_like('zXcV').should == [@r1, @r2]
    end
    
    it "should find only the first record by upcased case-sensetive code" do 
      TestRecord.exact_like("ASDF").should == [@r1]
    end
    
    it "should find only the second record by downcased case-sensitive code" do 
      TestRecord.exact_like("asdf").should == [@r2]
    end
    
    it "should find nothing by mixed cased string" do 
      TestRecord.exact_like('aSDf').should be_empty
    end
    
    it "should find nothing by part of an exact string" do 
      TestRecord.exact_like('zx').should be_empty
    end
  end
  
  describe "begining match" do 
    before :all do 
      @r1 = TestRecord.create :path => '/asdf'
      @r2 = TestRecord.create :path => '/asdf/zxcv'
    end
    
    it "should find both by a common beginning string" do 
      TestRecord.which_begins_like('/asd').should == [@r1, @r2]
    end
    
    it "should find both records by case insensitive search" do 
      TestRecord.which_begins_like('/ASDF').should == [@r1, @r2]
    end
    
    it "should find the second record only when it matches" do 
      TestRecord.which_begins_like('/asdf/').should == [@r2]
    end
    
    it "should find nothing by a middle strings" do 
      TestRecord.which_begins_like('/zxc').should be_empty
    end
  end
  
  describe "ending match" do 
    before :all do 
      @r1 = TestRecord.create :host => 'asdf'
      @r2 = TestRecord.create :host => 'zxcv.asdf'
    end
    
    it "should find both records by a common ending" do 
      TestRecord.which_ends_like('asdf').should == [@r1, @r2]
    end
    
    it "should perform a case-insensitive search" do 
      TestRecord.which_ends_like('ASDF').should == [@r1, @r2]
    end
    
    it "should find only the second record by its end" do 
      TestRecord.which_ends_like('.asdf').should == [@r2]
    end
    
    it "should find nothing by an internal part of the string" do 
      TestRecord.which_ends_like('asd').should be_empty
    end
  end
  
  describe "search by related unit" do 
    before :all do 
      @r1 = TestRecord.create :title => 'asdf', :mate => TestRecordMate.create(:name => 'qwer')
      @r2 = TestRecord.create :title => 'asdf', :mate => TestRecordMate.create(:name => 'qwer zxcv')
    end
    
    it "should find both records by a common mate name and sort it in a reverse order" do 
      TestRecord.with_mate_like('qwer').should == [@r1, @r2]
    end
    
    it "should find the second record only by its mate name" do 
      TestRecord.with_mate_like('zxcv').should == [@r2]
    end
    
    it "should not match the records by title in the case" do 
      TestRecord.with_mate_like('asdf').should be_empty
    end
  end
end
