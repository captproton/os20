require File.dirname(__FILE__) + '/../../spec_helper'

describe "/slots/new.html.erb" do
  include SlotsHelper
  
  before(:each) do
    @slot = mock_model(Slot)
    @slot.stub!(:new_record?).and_return(true)
    assigns[:slot] = @slot
  end

  it "should render new form" do
    render "/slots/new.html.erb"
    
    response.should have_tag("form[action=?][method=post]", slots_path) do
    end
  end
end


