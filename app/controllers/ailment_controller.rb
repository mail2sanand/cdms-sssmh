class AilmentController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def get_all_subailments
    all_sub_ailments = Ailment.all_sub_ailments

    respond_to do |format|
      format.html
      format.json { render json: all_sub_ailments}
    end
  end

  def get_all_ailments_for_combo
    all_ailments = Ailment.all_ailments.select(:id,:name)

    respond_to do |format|
      format.html
      format.json { render json: all_ailments}
    end
  end

  def get_ailment_template

    ailment = params[:ailment]
    render "_"+ailment.downcase+"_template", :layout=>false

    # case params[:ailment]
    #   when "Diabeties"
    #     render :
    # end
  end

end
