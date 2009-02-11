class SlotsController < ApplicationController
    @protected_actions  = [ :destroy ]
    @managable_actions     =  [ :index ]
    before_filter :login_required, :except => :feed
    ## before_filter :check_auth, :only => @protected_actions
    before_filter :check_auth, :only => @protected_actions

    def index
      @body_class="ylf-home"
      @javascripts = ['http://l.yimg.com/jn/js/20081208112220/ylf_core.js', 'http://l.yimg.com/jn/js/20081208112220/manage.js','http://l.yimg.com/a/lib/uh/js/uh-1.3.0.js']
      
      @doc_id = 'ylf-blog-mgr'
      @doc_class = 'doc'
      @slots = Slot.search(params[:search]).paginate(:per_page => 5, :page => params[:page])
      
      ## @comments = @site.unapproved_comments.count :all, :group => :slot, :order => '1 desc'
      ## @sections = site.sections.find(:all)
      ## @remark = Remark.new
      
    end

    def show
      # this is an autotest
      @body_class = 'js'
      @body_id = 'ylf-ch-none'
      @related = Slot.find(:all, :limit => 5)
      @slot  = Slot.find(params[:id])
      @remark = Remark.new
      @remarks = Remark.find_remarks_for_remarkable("Slot", @slot.id)

      ## @comments = @slot.comments.collect &:to_liquid
      ## @slot  = @slot.to_liquid(:mode => :single)

      ## render :text => site.call_render(site.sections.home, :single, 'slots' => [@slot], 'slot' => @slot, 'comments' => @comments, 'site' => site.to_liquid)
    end

    def new
      @slot = Slot.new
      @page_title = 'Compose a New Slot Entry' 
    end

    def edit
      @page_title = 'Edit a Slot Entry'
      @slot = current_user.slots.find(params[:id])
    end

    def create
        @slot = current_user.slots.build(params[:slot])
      respond_to do |format|
        if @slot.save
          format.html do
            flash[:notice] = 'Slot was successfully created.'
            redirect_to slot_path(@slot)
          end
          format.xml  { render :xml => @slot, :status => :created,
            :location => @slot }
        else
          format.html { render :action => "new" }
          format.xml  { render :xml => @slot.errors,
            :status => :unprocessable_entity }
        end
      end

    end

    def update
          @slot = current_user.slots.find(params[:id])

          respond_to do |format|
            if @slot.update_attributes(params[:slot])
              flash[:notice] = 'Slot was successfully updated.'
              format.html { redirect_to(slot_path(@slot)) }
              format.xml  { head :ok }
            else
              format.html { render :action => "edit" }
              format.xml  { render :xml => @slot.errors,
                :status => :unprocessable_entity }
            end
          end
        rescue ActiveRecord::RecordNotFound => e
          prevent_access(e)
    end


    def destroy
      @slot = current_user.slots.find(params[:id])
      @slot.destroy
      
      respond_to do |format|
        format.html { redirect_to(slots_url) }
        format.xml  { head :ok }
      end
      
    end
    
    def remark
      @slot = current_user.slots.find([:id])
      #@slot = Slot.find(params[:id]) 
      ##@remark = current_user.new_remark_attributes.build(params[:new_remark_attributes])
      
      ## @remark = params[:slot:new_remark_attributes]
      ## Format: article.users.create!(:name => "dave")
      ## @slot.remarks.create!(@remarks)
      ## @slot.remarks << @remark
      if @slot.update_attributes(params[:slot])
        flash[:notice] = "Successfully added comment." 
        redirect_to slot_path(@slot) 
      else 
        flash[:notice] = "You lose." 
        
        redirect_to users_path
      end 
    end
      
    def manage
      @slots = Slot.search(params[:search]) ## manage_slots_path
    end

    private
    
      def prevent_access(e)
        logger.info "SlotsController#prevent_access: #{e}"
        respond_to do |format|
          format.html { redirect_to(slots_url) }
          format.xml  { render :text => "error" }
        end
      end
      
          
    protected

      # This is implemented on a per-polymorph basis because the asset.attachable may be
      # an object that is *indirectly* tied to the current user.
      def check_auth
        @slot.user == (current_user ) or raise AccessDenied
      end
      
      


end
