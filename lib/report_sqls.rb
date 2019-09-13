module ReportSqls

	def get_filter_query_for_usg_abdomen
		return "  with abnormal_usg as (
		select rank() over (partition by p.id order by inv_det.id desc), p.name as patient_name,
		  inv_det.id inv_det_id, p.id p_id, 
		  investigation_details->>'usg_abdomen' inv_det_usg_abdomen, p.nodal_village_id,
		    (
	          date_part('year', CURRENT_DATE) - date_part('year', \"dateOfBirth\")
	        ) as age, 
	        case 
	          when p.gender = 1 then 'Male'
	          else 'Female'
	        end as gender, 
		    (select name from villages where id = village_id) as village_name,
	        contact	  
			  from investigation_details inv_det
			    join patients p on p.id = inv_det.patient_id
				  where (investigation_details->>'usg_abdomen') != ''
				    and p.alive = 1
		) 
	  select inv_det_id, p_id as patient_id, patient_name, inv_det_usg_abdomen as abnormal_usg_abdomen_details, 
	  	age, gender, village_name, contact, v.name as nodal_village, 
	  	pad.patient_ailment_details->>'dm_no' as dm_number
	      from abnormal_usg a_usg
		    join villages v on v.id = a_usg.nodal_village_id
		    join patient_ailment_details pad on pad.patient_id = a_usg.p_id
	      where rank = 1
	        and lower(inv_det_usg_abdomen) not like '%normal%' and lower(inv_det_usg_abdomen) not like '%fatty liver%'
		  order by patient_name asc
	"
	  	end

end
