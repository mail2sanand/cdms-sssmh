module ApplicationHelper

  def convertHashObjectToJSON(hashObject)
    newObjectJSON = Hash.new
    hashObject.each do |key,value|
      newObjectJSON[key] = value
    end

    newObjectJSON
  end

end
