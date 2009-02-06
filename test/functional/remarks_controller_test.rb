require 'test_helper'

class RemarksControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:remarks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create remark" do
    assert_difference('Remark.count') do
      post :create, :remark => { }
    end

    assert_redirected_to remark_path(assigns(:remark))
  end

  test "should show remark" do
    get :show, :id => remarks(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => remarks(:one).id
    assert_response :success
  end

  test "should update remark" do
    put :update, :id => remarks(:one).id, :remark => { }
    assert_redirected_to remark_path(assigns(:remark))
  end

  test "should destroy remark" do
    assert_difference('Remark.count', -1) do
      delete :destroy, :id => remarks(:one).id
    end

    assert_redirected_to remarks_path
  end
end
