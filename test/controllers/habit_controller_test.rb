require 'test_helper'

class HabitControllerTest < ActionDispatch::IntegrationTest
  test "should get get_all_habits_for_combo" do
    get habit_get_all_habits_for_combo_url
    assert_response :success
  end

end
