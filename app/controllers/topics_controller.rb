class TopicsController < ApplicationController

  def index
    @topics = Tag.find :all
    

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @topics }
    end
  end
 
  # GET /topics/1
  # GET /topics/1.xml
  def show
    @side = "show"
    @body_class = 'js'
    @body_id = 'ylf-ch-none'
    @stylesheets = ['base', 'uh-1.1.3']
    @javascripts = ['http://l.yimg.com/a/lib/uh/js/uh-1.3.0.js', 'http://us.js2.yimg.com/us.js.yimg.com/lib/rt/rto1_78.js']
    @doc_id = "ylf-blog"
    @doc_class = "doc nobg cls"
    
    @topic = Tag.find(params[:id])
    @slots = Slot.find_tagged_with(@topic.name, :on => :topics)
    
    

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @topics }
    end
  end

end
