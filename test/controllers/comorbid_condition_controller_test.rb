require 'test_helper'

class ComorbidConditionControllerTest < ActionDispatch::IntegrationTest
  test "should get get_all_comorbid_conditions_for_combo" do
    get comorbid_condition_get_all_comorbid_conditions_for_combo_url
    assert_response :success
  end

end
