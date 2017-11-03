require 'test_helper'

class VisitControllerTest < ActionDispatch::IntegrationTest
  test "should get get_patient_visits" do
    get visit_get_patient_visits_url
    assert_response :success
  end

  test "should get save_patient_visit" do
    get visit_save_patient_visit_url
    assert_response :success
  end

end
