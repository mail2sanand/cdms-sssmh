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
   {:id=>2,:name=>"Kondakamarala",:xcord=>14.068898,:ycord=>77.958026,:displayOrder=>6},
   {:id=>3,:name=>"Marala",:xcord=>14.3089655379495,:ycord=>77.9459381103516,:displayOrder=>9},
   {:id=>4,:name=>"Chandrayunpalli",:xcord=>14.200946,:ycord=>77.801907,:displayOrder=>10},
   {:id=>5,:name=>"Veldurthi",:xcord=>14.2810193632547,:ycord=>77.7706718444824,:displayOrder=>11},
   {:id=>6,:name=>"Vankarakunta",:xcord=>14.1964943689827,:ycord=>77.9986381530762,:displayOrder=>8},
   {:id=>7,:name=>"Byrapuram",:xcord=>14.1342451598417,:ycord=>77.7131652832031,:displayOrder=>3},
   {:id=>8,:name=>"Chowtakuntapalli",:xcord=>14.15039164715,:ycord=>77.9878234863281,:displayOrder=>7},
   {:id=>9,:name=>"Markuntapalli",:xcord=>14.184512,:ycord=>77.714617,:displayOrder=>4},
   {:id=>10,:name=>"GowniPalli",:displayOrder=>13},
   {:id=>11,:name=>"Nidimamidi",:xcord=>14.0507479051766,:ycord=>77.7133369445801,:displayOrder=>2},
   {:id=>12,:name=>"Obulampalli",:xcord=>14.2697068294713,:ycord=>77.6354026794434,:displayOrder=>12}
])

Department.create([
    {:name => "MS", :desc => "Medical Specialists. Diabeties, Hyper Tension and Other come under this"},
    {:name => "Opthamology", :desc => "Opthamology"}
])

ms_dept = Department.find_by(:name=>"MS")

Ailment.create([
    {:code=>"diabeties",:name=>"Diabeties",:desc=>"Diabeties",:department_id=>ms_dept.id, :botanical_name => "Diabetes Mellitus"},
    {:code=>"hypertension",:name=>"Hypertension",:desc=>"Hypertension",:department_id=>ms_dept.id},
    {:code=>"cardiac_ailment",:name=>"Cardiac Ailments",:desc=>"Cardiac Ailments",:department_id=>ms_dept.id},
    {:code=>"epilepsy",:name=>"Epilepsy",:desc=>"Epilepsy",:department_id=>ms_dept.id},
    {:code=>"asthma",:name=>"Asthama",:desc=>"Asthama",:department_id=>ms_dept.id},
    {:code=>"thyroid",:name=>"Thyroid",:desc=>"Thyroid",:department_id=>ms_dept.id},
    {:code=>"hyper_lipidemia",:name=>"Hyper Lipidemia",:desc=>"Hyper Lipidemia",:department_id=>ms_dept.id},
    {:code=>"cva",:name=>"CVA",:desc=>"CVA",:department_id=>ms_dept.id}
    # {:code=>"gtcs",:name=>"GTCS",:desc=>"GTCS",:department_id=>ms_dept.id},
    # ,{:code=>"combined_disease",:name=>"Combined Disease",:desc=>"Combined Disease",:department_id=>ms_dept.id},
    # {:code=>"all_diseases",:name=>"All Diseases",:desc=>"All Diseases",:department_id=>ms_dept.id}
])

dm = Ailment.find_by name: "Diabeties"
htm = Ailment.find_by name: "Hypertension"
Ailment.create([
    {:code=>"diabeties_type_1",:name=>"Diabeties Type 1", :desc=>"Diabeties Type 1",:parent_ailment_id=>dm.id},
    {:code=>"diabeties_type_2",:name=>"Diabeties Type 2", :desc=>"Diabeties Type 2",:parent_ailment_id=>dm.id}
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























