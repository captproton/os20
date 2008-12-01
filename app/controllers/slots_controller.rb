class SlotsController < ApplicationController
    @protected_actions = [ :edit, :update, :destroy ]
    skip_before_filter :login_required, :only => [ :index, :new]
    ## before_filter :check_auth, :only => @protected_actions

    def index
      ## @slots = site.slots.paginate(slot_options(:order => 'contents.published_at DESC', :select => 'contents.*',
      ##                                                 :page => params[:page], :per_page => params[:per_page]))
      @slots = Slot.find(:all)
      ## @comments = @site.unapproved_comments.count :all, :group => :slot, :order => '1 desc'
      ## @sections = site.sections.find(:all)
    end

    def show
      @slot  = Slot.find(params[:id])
      ## @comments = @slot.comments.collect &:to_liquid
      ## @slot  = @slot.to_liquid(:mode => :single)

      ## render :text => site.call_render(site.sections.home, :single, 'slots' => [@slot], 'slot' => @slot, 'comments' => @comments, 'site' => site.to_liquid)
    end

    def new
        @slot = current_user.slots.build(:filter => current_user.filter, :published_at => Time.now.utc)

      respond_to do |format|
        format.html # new.html.erb
        format.xml  { render :xml => @slot }
      end
      
    end

    def edit
        @slot = current_user.slots.find(params[:id])
      @version   = params[:version] ? @slot.find_version(params[:version]) : @slot or raise(ActiveRecord::RecordNotFound)
      @published = @version.published?
      @version.published_at = (@version.published_at || Time.now.utc)
    end

    def create
        @slot = current_user.slots.create params[:slot]
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
        ## Mephisto code commented out  
        ## @slot.attributes = params[:slot].merge(:updater => current_user)
        ## save_with_revision? ? @slot.save! : @slot.save_without_revision!
        ## flash[:notice] = "Your slot was updated"
        ## redirect_to :action => 'edit', :id => params[:id]
    ## rescue ActiveRecord::RecordInvalid
      ## load_sections
      ##render :action => 'edit'
    end

    def destroy
      @slot.destroy
      flash[:notice] = "The slot: #{@slot.title.inspect} was deleted."
      render :update do |page|
        page.redirect_to :action => 'index'
      end
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
        @slot.user == current_user or raise AccessDenied
      end


end
