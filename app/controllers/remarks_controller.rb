class RemarksController < ApplicationController
  # GET /remarks
  # GET /remarks.xml
  before_filter :get_remarkable
  ## before_filter :use_slot_layout
  

  def index
    @remarks = Remark.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @remarks }
    end
  end

  # GET /remarks/1
  # GET /remarks/1.xml
  def show
    get_remarkable
    @remark = Remark.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @remark }
    end
  end

  # GET /remarks/new
  # GET /remarks/new.xml
  def new
    @remark = Remark.new
    @remarks = Remark.find_remarks_for_remarkable("Slot", @remarkable.id)
    
    
    ## @remark.user_id = current_user

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @remark }
    end
  end

  # GET /remarks/1/edit
  def edit
    @remark = current_user.remark.find(params[:id])
  end

  # POST /remarks
  # POST /remarks.xml
  def create
    @remark = current_user.remarks.build(params[:remark])
    @remark.user_id = current_user
    @remark.remarkable_id = (params[:slot_id])
    @remark.remarkable_type = "Slot"

    respond_to do |format|
      if @remark.save
        flash[:notice] = 'Remark was successfully created.'
        format.html { redirect_to(slot_url(@remarkable)) }
        format.xml  { render :xml => @remark, :status => :created, :location => @remark }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @remark.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /remarks/1
  # PUT /remarks/1.xml
  def update
    @remark = current_user.remark.find(params[:id])

    respond_to do |format|
      if @remark.update_attributes(params[:remark])
        flash[:notice] = 'Remark was successfully updated.'
        format.html { redirect_to(@remark) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @remark.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /remarks/1
  # DELETE /remarks/1.xml
  def destroy
    @remark = current_user.remark.find(params[:id])
    @remark.destroy

    respond_to do |format|
      format.html { redirect_to(remarks_url) }
      format.xml  { head :ok }
    end
  end

private

def get_remarkable
  @remarkable ||=  Slot.find(params[:slot_id])  
end
def load_slot
  @slot ||=  Slot.find(params[:slot_id])  
end

def use_slot_layout 
render(:layout => "/layouts/slots") 
end 


def prevent_access(e)
  logger.info "SlotsController#prevent_access: #{e}"
  respond_to do |format|
    format.html { redirect_to(slots_url) }
    format.xml  { render :text => "error" }
  end
end


end
