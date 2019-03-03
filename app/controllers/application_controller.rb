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

  def calculate_year_with_age(age)
    Date.today.year - age
  end

  def calculate_next_month_village_date(village_date_order,report_for_month_of = nil)
    #Calculate and Format the Date
    year_month = Date.today
    year = (year_month.month == 12 ? (year_month.year+1) : year_month.year)

    # month_to_consider = (report_for_month_of ? report_for_month_of-1 : year_month.month)

    # # In case the month is Dec, then default the next month to Jan and not month + 1
    # month = (year_month.month == 12 ? 1 : (year_month.month + 1))
    # month = (report_for_month_of == 12 ? 1 : report_for_month_of) if report_for_month_of

    month = (report_for_month_of ? (report_for_month_of == 12 ? 1 : report_for_month_of) : (year_month.month == 12 ? 1 : (year_month.month + 1)) )

    return Date.new(year,month,village_date_order).strftime("%d %b, %Y")
  end


end
