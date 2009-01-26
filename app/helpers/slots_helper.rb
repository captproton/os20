module SlotsHelper
  def page_title 
  @page_title || "Our Slots" 
  end 
  
  def body_class_and_id
    if @body_class
      @classes = " class='" + @body_class +"'"
    else
      @classes = ""
    end
    if @body_id
      @id = " id='" + @body_id +"'"
    else
      @id = ""
    end
    return @classes + @id  
  end
  
  def on_stage
    if @doc_class
      @classes = " class='" + @doc_class +"'"
    else
      @classes = ""
    end
    if @doc_id
      @id = " id='" + @doc_id +"'"
    else
      @id = ""
    end
    return @classes + @id  
  end
  
  def sidebar
    unless @doc_id == 'ylf-blog-mgr'
        render :partial => '/shared/side_for_' + @side

    else
    ## no sidebar at all
  end
  end
  
end
