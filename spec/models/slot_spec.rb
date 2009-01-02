require File.dirname(__FILE__) + '/../spec_helper'

describe Slot do
  before(:each) do
    @slot = Slot.new
  end

  it "should be valid" do
    @slot.user_id = 1
    @slot.title = "life in the fast lane"
    @slot.should be_valid
  end
end
