module SlotsHelper
  
  def palooza_style
      @stylesheets = ['base', 'uh-1.1.3'] if controller.action_name  == "index" || controller.action_name  ==  "show"
      
      @stylesheets = ['http://yui.yahooapis.com/2.5.0/build/assets/skins/sam/skin.css', '20090129191543/base', '20090129191543/manage', 'uh-1.1.3'] if controller.action_name  == "new" || controller.action_name  == "edit"
          
      @stylesheets = ['base', 'manage', 'uh-1.1.3']  if controller.action_name  == "manage" 
      
    
  end
  
  def palooza_javascripts
    @javascripts = ['http://l.yimg.com/a/lib/uh/js/uh-1.3.0.js', 'http://us.js2.yimg.com/us.js.yimg.com/lib/rt/rto1_78.js'] if controller.action_name  == "index" || controller.action_name  ==  "show"
    
    @javascripts = ['20090129191543/ylf_core.js', '20090129191543/manage.js','http://l.yimg.com/a/lib/uh/js/uh-1.3.0.js'] if controller.action_name  == "new" || controller.action_name  == "edit"
        
    @javascripts = ['base', 'manage', 'uh-1.1.3']  if controller.action_name  == "manage"     
        
  end
  def page_title 
  @page_title || "Our Slots" 
  end 
  
  def body_class_and_id
    # show:  	ylf-blog-main, side, super-footer
		# index:				main idx, side, super-footer
		# new:					main, side
		# edit:					main, side
		#manage(?manage=yes):	cls inline-edit (id = ylf-blog-head), mod, 
		
    
    body_class_id = 'class="js"' if controller.action_name  == "manage" 
    body_class_id = 'id="ylf-blog-index" class="posts-index js"' if controller.action_name  == "index" 
    body_class_id = 'id="ylf-ch-none" class="js"'  if controller.action_name  == "show" 
    body_class_id = 'class="yui-skin-sam write js"'  if controller.action_name  == "new" ||  controller.action_name  == "edit" 
    return body_class_id 
  end
  
  def on_stage
   
    main_column_class_id = 'id="ylf-blog-mgr" class="doc"' if controller.action_name  == "manage" 
    main_column_class_id = ' class="doc cls"' if controller.action_name  == "index" 
    main_column_class_id = 'id="ylf-blog" class="doc cls"'  if controller.action_name  == "show" 
    main_column_class_id = 'class="doc cls"'  if controller.action_name  == "new" ||  controller.action_name  == "edit" 
    return main_column_class_id 
  end
  
  def remarks_count(parent_model, parent_id)
    r_count = Remark.find_remarks_for_remarkable(parent_model, parent_id)
    return r_count
  end
  
  def sidebar
    unless @doc_id == 'ylf-blog-mgr'
        render :partial => '/shared/side_for_' + @side

    else
    ## no sidebar at all
  end
  end
  
end
