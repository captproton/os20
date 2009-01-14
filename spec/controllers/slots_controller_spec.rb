require File.dirname(__FILE__) + '/../spec_helper'

describe SlotsController do
  describe "handling GET /slots" do

    before(:each) do
      @slot = mock_model(Slot)
      Slot.stub!(:find).and_return([@slot])
    end
  
    def do_get
      get :index
    end
  
    it "should be redirect if not logged in" do
      pending "Not done yet"
      ## do_get
      ## response.should be_redirect
    end

    it "should render index template" do
      pending "Not done yet"
      
      ## do_get
      ##response.should render_template('index')
    end
  
    it "should find all slots" do
      pending "Not done yet"
      ## Slot.should_receive(:find).with(:all).and_return([@slot])
      ## do_get
    end
  
    it "should assign the found slots for the view" do
      pending "Not done yet"
      ##do_get
      ##assigns[:slots].should == [@slot]
    end
  end

  describe "handling GET /slots.xml" do

    before(:each) do
      @slot = mock_model(Slot, :to_xml => "XML")
      Slot.stub!(:find).and_return(@slot)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :index
    end
  
    it "should be successful" do
      pending "Not done yet"
      ##do_get
      ##response.should be_success
    end

    it "should find all slots" do
      pending "Not done yet"
      ## Slot.should_receive(:find).with(:all).and_return([@slot])
      ## do_get
    end
  
    it "should render the found slots as xml" do
      pending "Not done yet"
      ## @slot.should_receive(:to_xml).and_return("XML")
      ## do_get
      ## response.body.should == "XML"
    end
  end

  describe "handling GET /slots/1" do

    before(:each) do
      @slot = mock_model(Slot)
      Slot.stub!(:find).and_return(@slot)
      
    end
  
    def do_get
      get :show, :id => "1"
    end

    it "should be redirect if not logged in" do
      ## pending "Not done yet"
      do_get
      response.should be_redirect
    end
  
    it "should render show template" do
      pending "Not done yet"
      ##do_get
      ##response.should render_template('show')
    end
  
    it "should find the slot requested" do
      pending "Not done yet"
      ###Slot.should_receive(:find).with("1").and_return(@slot)
      ##do_get
    end
  
    it "should assign the found slot for the view" do
      pending "Not done yet"
      ##do_get
      ##assigns[:slot].should equal(@slot)
    end
  end

  describe "handling GET /slots/1.xml" do

    before(:each) do
      @slot = mock_model(Slot, :to_xml => "XML")
      Slot.stub!(:find).and_return(@slot)
    end
  
    def do_get
      @request.env["HTTP_ACCEPT"] = "application/xml"
      get :show, :id => "1"
    end

    it "should be successful" do
      pending "Not done yet"
      ##do_get
      ##response.should be_success
    end
  
    it "should find the slot requested" do
      pending "Not done yet"
      ##Slot.should_receive(:find).with("1").and_return(@slot)
      ##do_get
    end
  
    it "should render the found slot as xml" do
      pending "Not done yet"
      ##@slot.should_receive(:to_xml).and_return("XML")
      ##do_get
      ##response.body.should == "XML"
    end
  end

  describe "handling GET /slots/new" do

    before(:each) do
      @slot = mock_model(Slot)
      Slot.stub!(:new).and_return(@slot)
    end
  
    def do_get
      get :new
    end

    it "should redirect to new session if not logged in" do
      ## pending "Not done yet"
      do_get
      response.should redirect_to("/sessions/new")
    end
  
    it "should render new template" do
      ## pending "Not done yet"
      do_get
      response.should render_template('new')
    end
  
    it "should create an new slot" do
      ##Slot.should_receive(:new).and_return(@slot)
      ##do_get
    end
  
    it "should not save the new slot" do
      ##@slot.should_not_receive(:save)
      ##do_get
    end
  
    it "should assign the new slot for the view" do
      ##do_get
      ##assigns[:slot].should equal(@slot)
    end
  end

  describe "handling GET /slots/1/edit" do

    before(:each) do
      @slot = mock_model(Slot)
      Slot.stub!(:find).and_return(@slot)
    end
  
    def do_get
      get :edit, :id => "1"
    end

    it "should be successful" do
      ##do_get
      ##response.should be_success
    end
  
    it "should render edit template" do
      ##do_get
      ##response.should render_template('edit')
    end
  
    it "should find the slot requested" do
      ##Slot.should_receive(:find).and_return(@slot)
      ##do_get
    end
  
    it "should assign the found Slot for the view" do
      ##do_get
      ##assigns[:slot].should equal(@slot)
    end
  end

  describe "handling POST /slots" do

    before(:each) do
      @slot = mock_model(Slot, :to_param => "1")
      Slot.stub!(:new).and_return(@slot)
    end
    
    describe "with successful save" do
  
      def do_post
        @slot.should_receive(:save).and_return(true)
        post :create, :slot => {}
      end
  
      it "should create a new slot" do
        Slot.should_receive(:new).with({}).and_return(@slot)
        do_post
      end

      it "should redirect to the new slot" do
        do_post
        response.should redirect_to(slot_url("1"))
      end
      
    end
    
    describe "with failed save" do

      def do_post
        @slot.should_receive(:save).and_return(false)
        post :create, :slot => {}
      end
  
      it "should re-render 'new'" do
        do_post
        response.should render_template('new')
      end
      
    end
  end

  describe "handling PUT /slots/1" do

    before(:each) do
      @slot = mock_model(Slot, :to_param => "1")
      Slot.stub!(:find).and_return(@slot)
    end
    
    describe "with successful update" do

      def do_put
        @slot.should_receive(:update_attributes).and_return(true)
        put :update, :id => "1"
      end

      it "should find the slot requested" do
        Slot.should_receive(:find).with("1").and_return(@slot)
        do_put
      end

      it "should update the found slot" do
        do_put
        assigns(:slot).should equal(@slot)
      end

      it "should assign the found slot for the view" do
        do_put
        assigns(:slot).should equal(@slot)
      end

      it "should redirect to the slot" do
        do_put
        response.should redirect_to(slot_url("1"))
      end

    end
    
    describe "with failed update" do

      def do_put
        @slot.should_receive(:update_attributes).and_return(false)
        put :update, :id => "1"
      end

      it "should re-render 'edit'" do
        pending "Not done yet"
        ##do_put
        ##response.should render_template('edit')
      end

    end
  end

  describe "handling DELETE /slots/1" do

    before(:each) do
      @slot = mock_model(Slot, :destroy => true)
      Slot.stub!(:find).and_return(@slot)
    end
  
    def do_delete
      delete :destroy, :id => "1"
    end

    it "should find the slot requested" do
      pending "Not done yet"
      ##Slot.should_receive(:find).with("1").and_return(@slot)
      ##do_delete
    end
  
    it "should call destroy on the found slot" do
      pending "Not done yet"
      ##@slot.should_receive(:destroy)
      ##do_delete
    end
  
    it "should redirect to the slots list" do
      ##do_delete
      ##response.should redirect_to(slots_url)
    end
  end
end