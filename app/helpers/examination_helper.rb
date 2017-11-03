module ExaminationHelper
  def get_examinations_from_helper
    # Get all the Examinations for the Index Page
    Examination.get_all_index_ailments.select(:id,:name,:units,:parameter_length,:code).order(id: :asc)
  end
end
