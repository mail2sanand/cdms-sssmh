module ReportsHelper
	def get_all_ailments
		all_ailments_hash = {}
		all_ailments = Ailment.all.select(:id,:name)

		all_ailments_hash["main_ailments"] = Ailment.all_ailments.select(:id,:name)
		all_ailments_hash["sub_ailments"] = {}

		
		Ailment.all_sub_ailments.select(:id,:name,:parent_ailment_id).each do |each_sub_ailment|
			all_ailments_hash["sub_ailments"][each_sub_ailment.parent_ailment_id] ||= []
			all_ailments_hash["sub_ailments"][each_sub_ailment.parent_ailment_id] << each_sub_ailment
		end

		puts "==========================================================================="
		puts all_ailments_hash["sub_ailments"]
		all_ailments_hash
	end
end
