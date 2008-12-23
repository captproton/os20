require File.dirname(__FILE__) + '/../spec_helper'

describe SlotsController do
  describe "route generation" do

    it "should map { :controller => 'slots', :action => 'index' } to /slots" do
      route_for(:controller => "slots", :action => "index").should == "/slots"
    end
  
    it "should map { :controller => 'slots', :action => 'new' } to /slots/new" do
      route_for(:controller => "slots", :action => "new").should == "/slots/new"
    end
  
    it "should map { :controller => 'slots', :action => 'show', :id => 1 } to /slots/1" do
      route_for(:controller => "slots", :action => "show", :id => 1).should == "/slots/1"
    end
  
    it "should map { :controller => 'slots', :action => 'edit', :id => 1 } to /slots/1/edit" do
      route_for(:controller => "slots", :action => "edit", :id => 1).should == "/slots/1/edit"
    end
  
    it "should map { :controller => 'slots', :action => 'update', :id => 1} to /slots/1" do
      route_for(:controller => "slots", :action => "update", :id => 1).should == "/slots/1"
    end
  
    it "should map { :controller => 'slots', :action => 'destroy', :id => 1} to /slots/1" do
      route_for(:controller => "slots", :action => "destroy", :id => 1).should == "/slots/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'slots', action => 'index' } from GET /slots" do
      params_from(:get, "/slots").should == {:controller => "slots", :action => "index"}
    end
  
    it "should generate params { :controller => 'slots', action => 'new' } from GET /slots/new" do
      params_from(:get, "/slots/new").should == {:controller => "slots", :action => "new"}
    end
  
    it "should generate params { :controller => 'slots', action => 'create' } from POST /slots" do
      params_from(:post, "/slots").should == {:controller => "slots", :action => "create"}
    end
  
    it "should generate params { :controller => 'slots', action => 'show', id => '1' } from GET /slots/1" do
      params_from(:get, "/slots/1").should == {:controller => "slots", :action => "show", :id => "1"}
    end
  
    it "should generate params { :controller => 'slots', action => 'edit', id => '1' } from GET /slots/1;edit" do
      params_from(:get, "/slots/1/edit").should == {:controller => "slots", :action => "edit", :id => "1"}
    end
  
    it "should generate params { :controller => 'slots', action => 'update', id => '1' } from PUT /slots/1" do
      params_from(:put, "/slots/1").should == {:controller => "slots", :action => "update", :id => "1"}
    end
  
    it "should generate params { :controller => 'slots', action => 'destroy', id => '1' } from DELETE /slots/1" do
      params_from(:delete, "/slots/1").should == {:controller => "slots", :action => "destroy", :id => "1"}
    end
  end
end