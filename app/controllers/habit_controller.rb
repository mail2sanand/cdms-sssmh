class HabitController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def get_all_habits_for_combo()
    all_habits = Habit.all.select(:id,:name)

    respond_to do |format|
      format.html
      format.json { render json: all_habits}
    end
  end

  def create_habits_for_patient(patient,patient_habits)
    puts "I am in save_patient_habits: #{patient_habits}"

    patient_habits.keys.each do |each_habit|
      habit_id = each_habit.split("_")[0]
      habit_comment = patient_habits[each_habit]

      if(habit_comment)
        PatientHabit.create({
           :patient_id => patient.id,
           :habit_id => habit_id,
           :comment => habit_comment
        })
      end
    end

  end

  def update_patient_habits(patient,patient_habits)
    patient_habits.keys.each do |each_habit|
      habit_comment = patient_habits[each_habit]

      habit_id = each_habit.split("_")[0]
      # puts "patient : #{patient.inspect}, habit_id : #{habit_id}"
      patient_habit = PatientHabit.find_by(:patient_id=>patient.id,:habit_id=>habit_id)

      if(patient_habit)
        patient_habit.update(:comment => habit_comment)
      elsif(!habit_comment.empty?)
        PatientHabit.create({
            :patient_id=>patient.id,
            :habit_id=>habit_id,
            :comment => habit_comment
          }
        )
      end

    end

  end

end
