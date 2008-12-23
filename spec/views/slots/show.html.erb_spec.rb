require File.dirname(__FILE__) + '/../../spec_helper'

describe "/slots/show.html.erb" do
  include SlotsHelper
  
  before(:each) do
    @slot = mock_model(Slot)

    assigns[:slot] = @slot
  end

  it "should render attributes in <p>" do
    render "/slots/show.html.erb"
  end
end

