require File.dirname(__FILE__) + '/../../spec_helper'

describe "/slots/index.html.erb" do
  include SlotsHelper
  
  before(:each) do
    slot_98 = mock_model(Slot)
    slot_99 = mock_model(Slot)

    assigns[:slots] = [slot_98, slot_99]
  end

  it "should render list of slots" do
    render "/slots/index.html.erb"
  end
end

