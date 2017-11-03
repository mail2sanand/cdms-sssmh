require 'test_helper'

class PatientControllerTest < ActionDispatch::IntegrationTest
  test "should get show_all" do
    get patient_show_all_url
    assert_response :success
  end

  test "should get get" do
    get patient_get_url
    assert_response :success
  end

  test "should get edit" do
    get patient_edit_url
    assert_response :success
  end

  test "should get delete" do
    get patient_delete_url
    assert_response :success
  end

end
