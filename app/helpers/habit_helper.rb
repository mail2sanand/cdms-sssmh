module HabitHelper
  def get_all_habits_from_helper
    Habit.all.select(:id,:name,:code)
  end
end
