require File.dirname(__FILE__) + '/../../spec_helper'

describe "/slots/edit.html.erb" do
  include SlotsHelper
  
  before do
    @slot = mock_model(Slot)
    assigns[:slot] = @slot
  end

  it "should render edit form" do
    render "/slots/edit.html.erb"
    
    response.should have_tag("form[action=#{slot_path(@slot)}][method=post]") do
    end
  end
end


