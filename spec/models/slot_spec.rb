require File.dirname(__FILE__) + '/../spec_helper'

describe Slot do
  before(:each) do
    @slot = Slot.new
  end

  it "should be valid" do
    @slot.should be_valid
  end
end
