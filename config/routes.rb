Rails.application.routes.draw do

  get 'report/index'

  get 'visit/get_patient_visits'

  get 'visit/save_patient_visit'

  get 'comorbid_condition/get_all_comorbid_conditions_for_combo'

  get 'habit/get_all_habits_for_combo'

  # Patient Details
    resources :patient
    get 'patients', to:'patient#index'
    get 'get_all_patients', to: 'patient#show_all'
    post 'create_patient', to: 'patient#create'
    post 'edit_patient', to:'patient#edit'

    get 'get_all_patients_for_search/:for_village', to:'patient#get_all_patients_for_search'

    get 'get_patient_detail/:id', to:'patient#get_patient_detail'

    delete 'delete_patient/:id', to:'patient#delete_patient'

  # Reports

    get 'reports', to:'reports#index'
    get 'print_patient_details/:id/:print/:ailment', to: 'patient#print_patient_details'
    get 'print_village_report/:patient_ids/:village_id/:print/:ailment_id',
        to: 'reports#print_village_report'

    get 'get_all_patients_for_reports/:village_id', to:'reports#get_all_patients_for_reports'

  # END of Reports

  # Ailment Details
    resources :ailment
    get 'get_all_subailments', to:'ailment#get_all_subailments'
    get 'get_all_ailments_for_combo', to:'ailment#get_all_ailments_for_combo'
    get 'get_ailment_template/:ailment', to:'ailment#get_ailment_template'


  # Habit Details
    resources :habit
    get 'get_all_habits_for_combo', to:'habit#get_all_habits_for_combo'

  # Co-Morbid Condition Details
    resources :co_morbid_condition
    get 'get_all_comorbid_conditions_for_combo', to:'comorbid_condition#get_all_comorbid_conditions_for_combo'


  # Villages
    resources :villages
    get 'get_all_villages', to: 'villages#get_all_villages'
    post 'delete_villages', to: 'villages#delete_villages'
    get 'get_parent_villages', to: 'villages#get_parent_villages'
  # END OF Villages

  # Visits
    get 'get_patient_visits/:id', to: 'visit#get_patient_visits'
  # END OF Visits

  # Investigation Details
    get 'get_investigation_details_visits/:id', to: 'investigation#get_all_patient_investigation_visits'
    get 'get_all_patients_investigation_details/:id/:visit', to: 'investigation#get_all_patients_investigation_details'
    get 'get_all_patients_dm_details/:id/:visit', to: 'dm#get_all_patients_dm_details'

  # END OF Investigation Details

  devise_for :users

  root "home#index"

  get '/patient_records', to:'patient#show_all'


end
