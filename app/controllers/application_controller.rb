class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  require 'date'

  def calculate_age(start_date, end_date)
    end_date.year - start_date.year - ((end_date.month > start_date.month || (end_date.month == start_date.month && end_date.day >= start_date.day)) ? 0 : 1)
  end

  def get_last_100_years
    this_year = Date.today.year
    (this_year-100..this_year)
  end

  def calculate_age_with_year(year)
    Date.today.year - year
  end

end
