# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  {:email=>"sssmhms.admin@gmail.com",
    :password=>"sairam",
    :password_confirmation=>"sairam"
  },
  {:email=>"admin@admin.com",
   :password=>"admin123",
   :password_confirmation=>"admin123"
  }
])

Village.create([
   {:id=>1,:name=>"Cherlopalli",:xcord=>14.571705,:ycord=>78.114152,:displayOrder=>5},
   {:id=>2,:name=>"Kondakamarla",:xcord=>14.068898,:ycord=>77.958026,:displayOrder=>6},
   {:id=>3,:name=>"Marala",:xcord=>14.3089655379495,:ycord=>77.9459381103516,:displayOrder=>9},
   {:id=>4,:name=>"Chandrayunpalli",:xcord=>14.200946,:ycord=>77.801907,:displayOrder=>10},
   {:id=>5,:name=>"Veldurthi",:xcord=>14.2810193632547,:ycord=>77.7706718444824,:displayOrder=>11},
   {:id=>6,:name=>"Vankarakunta",:xcord=>14.1964943689827,:ycord=>77.9986381530762,:displayOrder=>8},
   {:id=>9,:name=>"Byrapuram",:xcord=>14.1342451598417,:ycord=>77.7131652832031,:displayOrder=>3},
   {:id=>10,:name=>"Chowtakuntapalli",:xcord=>14.15039164715,:ycord=>77.9878234863281,:displayOrder=>7},
   {:id=>12,:name=>"Markuntapalli",:xcord=>14.184512,:ycord=>77.714617,:displayOrder=>4},
   {:id=>13,:name=>"Gownipalli",:displayOrder=>13},
   {:id=>14,:name=>"Nidimamidi",:xcord=>14.0507479051766,:ycord=>77.7133369445801,:displayOrder=>2},
   {:id=>15,:name=>"Obulampalli",:xcord=>14.2697068294713,:ycord=>77.6354026794434,:displayOrder=>12},
   {:id=>16,:name=>"Test Village"}
])

# Creation of Sub Villages
Village.create([
  {:id=>20,:name=>"Ammagundapalem",:parent_village_id=>1},
  {:id=>21,:name=>"Amidalakunta",:parent_village_id=>15},
  {:id=>22,:name=>"B. Kothakota",:parent_village_id=>4},
  {:id=>23,:name=>"B.N.Thanda",:parent_village_id=>3},
  {:id=>24,:name=>"Badlanapalli",:parent_village_id=>6},
  {:id=>25,:name=>"Balenayak Thanda",:parent_village_id=>3},
  {:id=>26,:name=>"Bandalapalli",:parent_village_id=>9},
  {:id=>27,:name=>"Basampalli",:parent_village_id=>15},
  {:id=>28,:name=>"Basireddipalli",:parent_village_id=>6},
  {:id=>29,:name=>"Beedupalli",:parent_village_id=>9},
  {:id=>30,:name=>"Bitraguntapalli",:parent_village_id=>4},
  {:id=>31,:name=>"Bommireddipalli",:parent_village_id=>2},
  {:id=>32,:name=>"Buggapalli",:parent_village_id=>14},
  {:id=>33,:name=>"Bukkapatnam",:parent_village_id=>1},
  {:id=>34,:name=>"BYR",:parent_village_id=>9},
  {:id=>35,:name=>"C.C. Thanda",:parent_village_id=>3},
  {:id=>36,:name=>"C.Reddivaripalli",:parent_village_id=>6},
  {:id=>37,:name=>"Chandrayunpalli",:parent_village_id=>4},
  {:id=>38,:name=>"Chennakothapalli",:parent_village_id=>15},
  {:id=>39,:name=>"Chowdampalli",:parent_village_id=>13},
  {:id=>40,:name=>"Dabaruvaripalli",:parent_village_id=>2},
  {:id=>41,:name=>"Danduvaripalli",:parent_village_id=>14},
  {:id=>42,:name=>"Dharmavaram",:parent_village_id=>15},
  {:id=>43,:name=>"Dhumapalli",:parent_village_id=>4},
  {:id=>44,:name=>"Diguvapalli",:parent_village_id=>1},
  {:id=>45,:name=>"Diguva Cherlopalli",:parent_village_id=>1},
  {:id=>46,:name=>"Duddebanda M/o Penukonda",:parent_village_id=>9},
  {:id=>47,:name=>"Yeddulavaripalli",:parent_village_id=>2},
  {:id=>48,:name=>"Ganginipalli",:parent_village_id=>5},
  {:id=>49,:name=>"Gangireddipalli",:parent_village_id=>15},
  {:id=>50,:name=>"Gowniguntapalli",:parent_village_id=>9},
  {:id=>51,:name=>"Gunemekanepalli",:parent_village_id=>9},
  {:id=>52,:name=>"Gunipalli",:parent_village_id=>4},
  {:id=>53,:name=>"Guntapalli",:parent_village_id=>12},
  {:id=>54,:name=>"Iragarajpalli",:parent_village_id=>12},
  {:id=>55,:name=>"Jagarajupalli",:parent_village_id=>12},
  {:id=>56,:name=>"Janakampalli",:parent_village_id=>1},
  {:id=>57,:name=>"Jareekuntapalli",:parent_village_id=>13},
  {:id=>58,:name=>"K.Locherla",:parent_village_id=>12},
  {:id=>59,:name=>"Kadiri Devarapalli",:parent_village_id=>5},
  {:id=>60,:name=>"Kambalaparthi",:parent_village_id=>1},
  {:id=>61,:name=>"Kammavaripalli",:parent_village_id=>15},
  {:id=>62,:name=>"Kanakavaripalli",:parent_village_id=>3},
  {:id=>63,:name=>"Kanumukala",:parent_village_id=>5},
  {:id=>64,:name=>"Kapalabanda",:parent_village_id=>12},
  {:id=>65,:name=>"Karravaripalli",:parent_village_id=>14},
  {:id=>66,:name=>"Katamreddipalli",:parent_village_id=>2},
  {:id=>67,:name=>"Kathivaripalli",:parent_village_id=>14},
  {:id=>68,:name=>"Kesapuram",:parent_village_id=>5},
  {:id=>69,:name=>"Kona Ashram",:parent_village_id=>15},
  {:id=>70,:name=>"Konapuram",:parent_village_id=>14},
  {:id=>71,:name=>"Kondathimmayyagaripalli",:parent_village_id=>2},
  {:id=>72,:name=>"Kothacheruvu",:parent_village_id=>12},
  {:id=>73,:name=>"Kothakota",:parent_village_id=>4},
  {:id=>74,:name=>"Kotlapalli",:parent_village_id=>14},
  {:id=>75,:name=>"Krishnapuram",:parent_village_id=>3},
  {:id=>76,:name=>"Kurumala",:parent_village_id=>10},
  {:id=>77,:name=>"Lingapagaripalli",:parent_village_id=>15},
  {:id=>78,:name=>"Locherla",:parent_village_id=>12},
  {:id=>79,:name=>"Madiribail",:parent_village_id=>6},
  {:id=>80,:name=>"Mangalamadaka",:parent_village_id=>3},
  {:id=>81,:name=>"Maralapalli",:parent_village_id=>14},
  {:id=>82,:name=>"Mudigubba",:parent_village_id=>3},
  {:id=>83,:name=>"Munimaduga",:parent_village_id=>12},
  {:id=>84,:name=>"Mylasamudram",:parent_village_id=>5},
  {:id=>119,:name=>"Mamillakunta",:parent_village_id=>9},
  {:id=>85,:name=>"Nagisettipalli",:parent_village_id=>5},
  {:id=>86,:name=>"Nallamadda",:parent_village_id=>10},
  {:id=>87,:name=>"Narasingayanpalli",:parent_village_id=>15},
  {:id=>88,:name=>"Nayanakota",:parent_village_id=>2},
  {:id=>89,:name=>"Nayanavaripalli",:parent_village_id=>6},
  {:id=>90,:name=>"Narepalli",:parent_village_id=>5},
  {:id=>91,:name=>"Obuladevarapalli",:parent_village_id=>9},
  {:id=>92,:name=>"P.C.Petta",:parent_village_id=>15},
  {:id=>93,:name=>"P.Kottala Rudram",:parent_village_id=>14},
  {:id=>94,:name=>"P.Devarapalli",:parent_village_id=>12},
  {:id=>95,:name=>"Pamdurthi",:parent_village_id=>4},
  {:id=>96,:name=>"Podavallipalli",:parent_village_id=>15},
  {:id=>97,:name=>"Pothulakunta",:parent_village_id=>9},
  {:id=>98,:name=>"Peddapalli",:parent_village_id=>14},
  {:id=>99,:name=>"Peddapalli Thanda",:parent_village_id=>14},
  {:id=>100,:name=>"Puttaparthi",:parent_village_id=>12},
  {:id=>101,:name=>"Reddyvaripalli",:parent_village_id=>6},
  {:id=>102,:name=>"Reddipalli",:parent_village_id=>6},
  {:id=>103,:name=>"Rachuvaripalli",:parent_village_id=>14},
  {:id=>104,:name=>"Sanevaripalli",:parent_village_id=>6},
  {:id=>105,:name=>"Sai Nagar",:parent_village_id=>9},
  {:id=>106,:name=>"Settipalli",:parent_village_id=>14},
  {:id=>107,:name=>"Subbarayunpalli",:parent_village_id=>14},
  {:id=>108,:name=>"Siddaramapuram",:parent_village_id=>4},
  {:id=>109,:name=>"Talamarla",:parent_village_id=>12},
  {:id=>110,:name=>"Tharuguvaripalli",:parent_village_id=>4},
  {:id=>111,:name=>"Veeranjinapalli",:parent_village_id=>1},
  {:id=>112,:name=>"Vengalamcheruvu",:parent_village_id=>1},
  {:id=>113,:name=>"Venkatgaripalli",:parent_village_id=>9},
  {:id=>114,:name=>"Yakalacherlopalli",:parent_village_id=>10},
  {:id=>115,:name=>"Yadalankapalli",:parent_village_id=>3},
  {:id=>116,:name=>"Yerrapalli",:parent_village_id=>12},
  {:id=>117,:name=>"Yerronipalli",:parent_village_id=>5},
  {:id=>118,:name=>"Yerravankapalli",:parent_village_id=>10}
])


Department.create([
    {:name => "MS", :desc => "Medical Specialists. Diabetes, Hyper Tension and Other come under this"},
    {:name => "Opthamology", :desc => "Opthamology"}
])

ms_dept = Department.find_by(:name=>"MS")

Ailment.create([
    {:id=>9,:code=>"diabetes",:name=>"Diabetes",:desc=>"Diabetes",:department_id=>ms_dept.id, :botanical_name => "Diabetes Mellitus"},
    {:id=>10,:code=>"hypertension",:name=>"Hypertension",:desc=>"Hypertension",:department_id=>ms_dept.id},
    {:id=>11,:code=>"cardiac_ailment",:name=>"Cardiac Ailments",:desc=>"Cardiac Ailments",:department_id=>ms_dept.id},
    {:id=>12,:code=>"epilepsy",:name=>"Epilepsy",:desc=>"Epilepsy",:department_id=>ms_dept.id},
    {:id=>13,:code=>"asthma",:name=>"Asthama",:desc=>"Asthama",:department_id=>ms_dept.id},
    {:id=>14,:code=>"thyroid",:name=>"Thyroid",:desc=>"Thyroid",:department_id=>ms_dept.id},
    {:id=>19,:code=>"hyper_lipidemia",:name=>"Hyper Lipidemia",:desc=>"Hyper Lipidemia",:department_id=>ms_dept.id},
    {:id=>16,:code=>"cva",:name=>"CVA",:desc=>"CVA",:department_id=>ms_dept.id}
    # {:code=>"gtcs",:name=>"GTCS",:desc=>"GTCS",:department_id=>ms_dept.id},
    # ,{:code=>"combined_disease",:name=>"Combined Disease",:desc=>"Combined Disease",:department_id=>ms_dept.id},
    # {:code=>"all_diseases",:name=>"All Diseases",:desc=>"All Diseases",:department_id=>ms_dept.id}
])

dm = Ailment.find_by name: "Diabetes"
htm = Ailment.find_by name: "Hypertension"
Ailment.create([
    {:code=>"diabetes_type_1",:name=>"Diabetes Type 1", :desc=>"Diabetes Type 1",:parent_ailment_id=>dm.id},
    {:code=>"diabetes_type_2",:name=>"Diabetes Type 2", :desc=>"Diabetes Type 2",:parent_ailment_id=>dm.id}
    # {:code=>"htn_type_1",:name=>"Hypertension Type 1", :desc=>"Hypertension Type 1",:parent_ailment_id=>htm.id},
    # {:code=>"htn_type_2",:name=>"Hypertension Type 2", :desc=>"Hypertension Type 2",:parent_ailment_id=>htm.id}
])

Habit.create([
    {:code=>"smoking",:name=>"Smoking"},
    {:code=>"alcohol",:name=>"Alcohol"},
    {:code=>"tobacco_chewing",:name=>"Tobacco Chewing"},
    {:code=>"non_veg_food",:name=>"Non-Veg Food"},
    # {:code=>"life_style",:name=>"Life Style"},
    {:code=>"prayer",:name=>"Prayer"},
    {:code=>"meditation",:name=>"Meditation"},
    {:code=>"excercise",:name=>"Exercise"},
    {:code=>"diet",:name=>"Diet"}
])

Examination.create([
    {:code=>"height",:name=>"Height",:units=>"Ft.",:parameter_length=>"small",:ailments_supported=>[0]},
    {:code=>"weight",:name=>"Weight",:units=>"Kgs",:parameter_length=>"small",:ailments_supported=>[0,dm.id]},
    {:code=>"bmi",:name=>"BMI",:parameter_length=>"small",:ailments_supported=>[0]},
    {:code=>"waist_circumference",:name=>"Waist Circumference",:ailments_supported=>[0]},
    {:code=>"pulse",:name=>"Pulse",:units=>"/min",:parameter_length=>"small",:ailments_supported=>[0,dm.id]},
    {:code=>"peripheral pulses",:name=>"Peripheral Pulses",:ailments_supported=>[0]},
    {:code=>"bp",:name=>"B.P",:units=>"mm/Hg",:parameter_length=>"small",:ailments_supported=>[0,1]},
    {:code=>"cvs",:name=>"CVS",:ailments_supported=>[0]},
    {:code=>"respiratory",:name=>"Respiratory",:ailments_supported=>[0]},
    {:code=>"foot_examination",:name=>"Foot Examination",:ailments_supported=>[0]},
    {:code=>"others",:name=>"Others",:ailments_supported=>[0]},
    {:code=>"hypoglycemic_attacks",:name=>"Hypoglycemic Attacks",:ailments_supported=>[dm.id]},
    {:code=>"infective_focus",:name=>"Infective Focus",:ailments_supported=>[dm.id]},
    {:code=>"fbs",:name=>"FBS",:units=>"mg/dl",:parameter_length=>"small",:ailments_supported=>[dm.id]},
    {:code=>"ppbs",:name=>"PPBS",:units=>"mg/dl",:parameter_length=>"small",:ailments_supported=>[dm.id]},
    {:code=>"rbs",:name=>"RBS",:units=>"mg/dl",:parameter_length=>"small",:ailments_supported=>[dm.id]}
])

Investigation.create([
    {:name=>"Blood Urea",:code=>"blood_urea"},
    {:name=>"S Creatin",:code=>"s_crt"},
    {:name=>"Lipid TC",:code=>"lipid_tc"},
    {:name=>"Lipid TG",:code=>"lipid_tg"},
    {:name=>"Lipid HDL",:code=>"lipid_hdl"},
    {:name=>"Lipid LDL",:code=>"lipid_ldl"},
    {:name=>"USG Abdomen",:code=>"usg_abdomen"},
    {:name=>"ECG",:code=>"ecg"},
    {:name=>"2D-Echo",:code=>"2d_echo"},
    {:name=>"TMT",:code=>"tmt"},
    {:name=>"Other",:code=>"Other"},
    {:name=>"Retinal Examination",:code=>"retinal_exam"},
    {:name=>"eGFR",:code=>"egfr"},
    {:name=>"Urine : Protein/Crt Ratio",:code=>"urine_protein_crt_ratio"},
    {:name=>"HbA1C",:code=>"hba1c"},
    {:name=>"Chronic Complications",:code=>"chronic_complication",:parameter_length=>"textarea"},
])























