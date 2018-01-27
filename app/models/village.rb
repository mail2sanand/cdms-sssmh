class Village < ApplicationRecord
  scope :parent_villages, -> { where(parent_village_id: 0).select(:id,:name)}
  scope :sub_villages, -> { where("parent_village_id != 0")}

  scope :get_parent_and_its_sub_villages, ->(parent_village_id) {where("id = ? or parent_village_id = ?",parent_village_id,parent_village_id)}

  def self.nodal_village(village_id)
    Village.find(village_id).select("
        CASE
            WHEN parent_village_id != 0
                THEN name || ' (' || (SELECT name FROM villages WHERE id=#{village_id}) || ' )'
            ELSE name
        END village_name
     ")

  end
end
