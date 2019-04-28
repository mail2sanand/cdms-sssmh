namespace :cmc do
	desc "Import All Users"
  	task convert_json: :environment do
  		count=0
	  		ComorbidCondition.order("ID asc").order("ID asc").each{|each_cmc_detail|
		  		begin
		  			modified_cmc_detail = JSON.parse(each_cmc_detail.comorbid_condition_details)
		  			each_cmc_detail.update(comorbid_condition_details: modified_cmc_detail)
			  		count+=1
			  	rescue Exception => e
			  		puts "Exception : #{e}"
			  	end
	  		}
	  	puts "Processed : #{count}"
  	end
end