class JumppageController < ApplicationController
  def index
    render(:layout => false) # never use a layout    
  end

end
