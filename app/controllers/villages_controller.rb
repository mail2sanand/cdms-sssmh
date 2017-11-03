class VillagesController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  def index
  end

  def get_all_villages
    @villages

    parent_village_id = params[:parent_village_id]

    if(parent_village_id and parent_village_id != "0")
      @villages = Village.get_parent_and_its_sub_villages(params[:parent_village_id]).order("id asc")
    else
      @villages = Village.all.order("id asc")
    end

    respond_to do |format|
      format.html
      format.json { render json: @villages}
    end
  end

  def create
      new_village_hash = {
          :name                   =>params[:name],
          :volunteerName          => params[:volunteerName],
          :volunteerMobileNumber  => params[:volunteerMobileNumber],
          :xcord                  => params[:xcord],
          :ycord                  => params[:ycord],
          :displayOrder           => params[:displayOrder]
      }

      if(params[:parent_village_id])
        new_village_hash[:parent_village_id] = params[:parent_village_id]
      end

      @new_village = Village.new(new_village_hash)
      @new_village.save
      render json: @new_village
  end

  def update
    @village_to_edit = Village.find(params[:id])
    to_be_modified_village_hash = {
        :name                   =>  params[:name],
        :volunteerName          =>  params[:volunteerName],
        :volunteerMobileNumber  =>  params[:volunteerMobileNumber],
        :xcord                  =>  params[:xcord],
        :ycord                  =>  params[:ycord],
        :displayOrder           =>  params[:displayOrder]
    }

    if(params[:parent_village_id])
      to_be_modified_village_hash[:parent_village_id] = params[:parent_village_id]
    end

    @village_to_edit.update(to_be_modified_village_hash)

    render json: @village_to_edit
  end

  def destroy
    Village.destroy(params[:id])
    render json: "true"
  end

  def delete_villages
    Village.where(:id=>params[:village_ids]).destroy_all
    render json: "true"
  end

  def get_parent_villages
    render json: Village.parent_villages.order("id asc")
  end


  protected


end
