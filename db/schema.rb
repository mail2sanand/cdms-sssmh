# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170927181138) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ailments", force: :cascade do |t|
    t.string "name"
    t.string "desc"
    t.integer "parent_ailment_id"
    t.string "code"
    t.bigint "department_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_ailments_on_department_id"
  end

  create_table "ailments_patients", id: false, force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "ailment_id", null: false
    t.index ["patient_id", "ailment_id"], name: "index_ailments_patients_on_patient_id_and_ailment_id"
  end

  create_table "comorbid_conditions", force: :cascade do |t|
    t.bigint "sub_ailment_id"
    t.bigint "patient_id"
    t.string "comorbid_condition_details"
    t.integer "identified_on_visit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_comorbid_conditions_on_patient_id"
    t.index ["sub_ailment_id"], name: "index_comorbid_conditions_on_sub_ailment_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.text "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "examination_details", force: :cascade do |t|
    t.bigint "patient_id"
    t.bigint "visit_id", default: 0
    t.bigint "examination_id"
    t.bigint "examination_taken_for_ailment_id"
    t.string "examination_finding"
    t.boolean "index"
    t.json "examination_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["examination_id"], name: "index_examination_details_on_examination_id"
    t.index ["examination_taken_for_ailment_id"], name: "index_examination_details_on_examination_taken_for_ailment_id"
    t.index ["patient_id"], name: "index_examination_details_on_patient_id"
    t.index ["visit_id"], name: "index_examination_details_on_visit_id"
  end

  create_table "examinations", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.string "units"
    t.string "parameter_length"
    t.integer "ailments_supported", array: true
    t.text "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "habits", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.text "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "investigation_details", force: :cascade do |t|
    t.bigint "patient_id"
    t.bigint "visit_id"
    t.bigint "ailment_id"
    t.json "investigation_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ailment_id"], name: "index_investigation_details_on_ailment_id"
    t.index ["patient_id"], name: "index_investigation_details_on_patient_id"
    t.index ["visit_id"], name: "index_investigation_details_on_visit_id"
  end

  create_table "investigations", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.string "units"
    t.string "parameter_length"
    t.text "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patient_habits", force: :cascade do |t|
    t.bigint "patient_id"
    t.bigint "habit_id"
    t.bigint "visit_id", default: 0
    t.bigint "ailment_id", default: 0
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ailment_id"], name: "index_patient_habits_on_ailment_id"
    t.index ["habit_id"], name: "index_patient_habits_on_habit_id"
    t.index ["patient_id"], name: "index_patient_habits_on_patient_id"
    t.index ["visit_id"], name: "index_patient_habits_on_visit_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.integer "gender"
    t.string "contact"
    t.string "cdno"
    t.string "sssmhIdNo"
    t.string "aadharNo"
    t.integer "dateOfBirth"
    t.string "annualIncome"
    t.integer "alive"
    t.bigint "village_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo_file_name"
    t.string "photo_content_type"
    t.integer "photo_file_size"
    t.datetime "photo_updated_at"
    t.index ["village_id"], name: "index_patients_on_village_id"
  end

  create_table "reports", force: :cascade do |t|
    t.string "report_type"
    t.string "report_type_value"
    t.string "report_file_path"
    t.bigint "visit_id"
    t.bigint "ailment_id"
    t.json "report_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ailment_id"], name: "index_reports_on_ailment_id"
    t.index ["visit_id"], name: "index_reports_on_visit_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "villages", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "volunteerName"
    t.string "volunteerMobileNumber"
    t.float "xcord"
    t.float "ycord"
    t.integer "displayOrder"
    t.integer "parent_village_id", default: 0, null: false
    t.string "mandal"
    t.string "district"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "visits", force: :cascade do |t|
    t.bigint "patient_id"
    t.date "visited_on"
    t.integer "visited_at"
    t.integer "ailments", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_visits_on_patient_id"
  end

  add_foreign_key "ailments", "ailments", column: "parent_ailment_id"
  add_foreign_key "ailments", "departments"
  add_foreign_key "patients", "villages"
end
