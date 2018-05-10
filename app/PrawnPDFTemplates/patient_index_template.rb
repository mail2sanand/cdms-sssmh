class PatientIndexTemplate < Prawn::Document
  def initialize(report_details,margin=[5,5,5,5])
    super(:margin => margin, :page_size => "A4")

    font_families.update(
        "helvitica" => {
            :normal => "#{Rails.root.join("app/assets/header/fonts/HELR45W.ttf")}",
            :bold => "#{Rails.root.join("app/assets/header/fonts/Helvetica-Bold.ttf")}",
            :italic => "#{Rails.root.join("app/assets/header/fonts/HELR45W.ttf")}"
        },
      "arial" => {
          :normal => "#{Rails.root.join("app/assets/header/fonts/Arial-Unicode-Bold.ttf")}"
      }
    )

    # stroke_color "ec1515"
    # stroke_bounds

    stroke_color "060606"

    ailment_details = report_details[:ailment_details]
    village_date = report_details[:village_date]

    move_down 10

    @report_details = report_details
    header(report_details[:dm_details],ailment_details)

    move_down 12

    patient_general_details_block(report_details[:pgd],report_details[:dm_details],village_date)

    move_down 5

    patient_history_details_block(report_details[:history],ailment_details)

    move_down 5

    patient_examination_details_block(report_details[:examination_findings],ailment_details)

    move_down 2

    patient_investigation_details_block()

  end

  def patient_investigation_details_block
    bounding_box([1,cursor],:width => 580, :height=>315) do

      bounding_box([1,cursor-5], :width=>560) do
        text "<b>INVESTIGATION DETAILS</b>", :size => 10,
             :inline_format => true, :styles => [:bold]
      end

      bounding_box([0,cursor], :width=>575) do
        image "#{Rails.root.join('app/assets/images/investigation_details.png')}",
              :width => 583,
              :height => 285
      end

      # stroke_bounds
    end

  end

  def patient_examination_details_block(examination_findings,ailment_details)

    if(examination_findings.empty?)
      # examination_findings =
    end

    # Patient Examination Findings Block
    bounding_box([3,cursor], :width=>580, :height=>125) do
      bounding_box([5,cursor-5], :width=>580) do
        text "<b>EXAMINATION FINDINGS</b>", :size => 10,
             :inline_format => true, :styles => [:bold]

        move_down 2

        # Patient Examination Findings Block
        # bounding_box([10,cursor], :width=>570) do
        puts "==========================>>>>>>> examination_findings : #{examination_findings.inspect}"
          table get_table_block(examination_findings,
                                {"cell_height"=>33,"border"=>0}),
                :cell_style => {
                    :inline_format => true, :size => 9, :align => :left,:padding => [5,0,0,0],
                    :width => 143, :valign => :top,:border_width => 1
                },
                :position => :left
        # end
      end
      stroke_bounds
    end  # END of History Bounding Box
  end


  def patient_history_details_block(history,ailment_details)

    # Patient History Block
    bounding_box([3,cursor], :width=>580, :height=>225) do
      # CMC Details Block
      bounding_box([5,cursor-5], :width=>570) do
        text "<b>HISTORY</b>", :size => 10,
             :inline_format => true, :styles => [:bold]

        move_down 2

        bounding_box([10,cursor], :width=>570) do
          table get_patient_cmc_details(history[:cmc],ailment_details),
            :cell_style => {
                :inline_format => true, :size => 10, :align => :left,:padding => 0
            },
            :position => :left
        end

        bounding_box([10,cursor], :width=>590) do
          table get_patient_cmc_table_details(history[:cmc]),
                :cell_style => {
                    :inline_format => true, :size => 9, :align => :left,:padding => 0
                },
                :position => :left
        end

        move_down 10
        # Patient Habits Block
        bounding_box([10,cursor], :width=>570) do
          table get_table_block(history[:habits],
              {"sub_heading"=>"5. Habits :","border"=>1,"cell_height"=>25,"size"=>9}),
              :cell_style => {
                  :inline_format => true, :align => :left,:padding => 0,
                  :width => 140 , :valign => :top
              },
              :position => :left
        end

        move_down 10
        bounding_box([10,cursor], :width=>570) do
          text "6. Any other Medical/Surgical Problem :  #{history[:other_history_details]["other_medical_problem"]}", :size => 10,
               :inline_format => true
        end

      end   # END of Internal Bounding Box having indentation
      stroke_bounds
    end  # END of History Bounding Box

  end

  def get_patient_cmc_table_details(cmc_details)
    [[
        {
            :content => "#{Prawn::Text::NBSP*3}<b>Hypertension from</b><br>#{Prawn::Text::NBSP*15}<u>#{cmc_details[:cmc_htn]}</u>",
            :height => 30,:border_width => 1,
            :width => 100
        },
        {
            :content => "#{Prawn::Text::NBSP*3}<b>Hyperlipidemia from</b><br>#{Prawn::Text::NBSP*15}<u>#{cmc_details[:cmc_hyper_lipidemia]}</u>",
            :width => 100,:border_width => 1
        },
        {
            :content => "#{Prawn::Text::NBSP}<b>Coronary Artery Disease from</b><br>#{Prawn::Text::NBSP*15}<u>#{cmc_details[:cmc_cad]}</u>",
            :width => 140,:border_width => 1
        },
        {
            :content => "#{Prawn::Text::NBSP*3}<b>CVA from</b><br>#{Prawn::Text::NBSP*15}<u>#{cmc_details[:cmc_cva]}</u>",
            :width => 70,:border_width => 1
        },
        {
            :content => "#{Prawn::Text::NBSP*3}<b>Others</b><br><u>#{cmc_details[:cmc_others]}</u>",
            :width => 150,:border_width => 1,:inline_format => true
        }
    ]]
  end

  def get_patient_cmc_details(cmc_details,ailment_details)
    cmc_dm_data_array = [
        [
            {
                :content => "1. #{ailment_details[:ailment_name].upcase} identified from ",
                :border_width => 0,:colspan => 2
            },
            {
                :content => "<u>#{cmc_details[:ailment_identified_from]}</u>",
                :border_width => 0,:height => 20,:colspan => 3
            }
        ],
        [
            {
                :content => "2. Type of DM : ",
                :border_width => 0,:height => 20,:colspan => 2
            },
            {
                :content => "<u>#{cmc_details[:ailment_type]}</u>",
                :border_width => 0,:colspan => 3
            }
        ],
        [
            {
                :content => "3. Under SSS Mobile Hospital care from : ",
                :border_width => 0,:colspan => 2,:height => 20
            },
            {
                :content => "<u>#{cmc_details[:under_sssmh_care_from]}</u>",
                :border_width => 0,:colspan => 3
            }
        ],
        [
            {
                :content => "4. Associated Co-Morbid Conditions : ",
                :border_width => 0,:colspan => 5,:height => 15
            }
        ]
    ]

    cmc_dm_data_array
  end

  def get_table_block(habits, cell_options={})

    habits_keys_length = habits.keys.length
    no_of_rows = ((habits_keys_length+1) / 4.0).ceil;

    parent_array = []

    parent_array << [
        {
            :content => cell_options["sub_heading"],
            :border_width => 0,:colspan => 5,
            :height => 15, :border_width => 0,
            :size => 10
        }
    ] if cell_options["sub_heading"]

    font_size = cell_options["size"]

    no_of_rows.times do
      habits_array = []
      i=3
      habits.each do |each_habit_key,each_habit_value|
        # puts "each_habit_key : #{each_habit_key}"
        each_habit_hash = {}
        each_habit_hash[:content] = " #{Prawn::Text::NBSP*2}<b>#{each_habit_key}</b> #{Prawn::Text::NBSP*4} <u>#{each_habit_value}</u>"
        each_habit_hash[:height] = (cell_options["cell_height"] ? cell_options["cell_height"] : 15)
        each_habit_hash[:border_width] = (cell_options["border"] ? cell_options["border"] : 1)
        each_habit_hash[:size] = (cell_options["font_size"] ? cell_options["font_size"] : 9)

        habits_array << each_habit_hash

        habits.delete(each_habit_key)
        break if i == 0
        i = i-1
      end
      parent_array << habits_array
    end

    parent_array

  end

  def header(dm_details, ailment_details)

    # dm_number = (dm_details ? dm_details.ailment_detail_value : "<u>Prawn::Text::NBSP*33</u>")
    image "#{Rails.root.join('app/assets/images/sssmh_reports_header.png')}",
          :at => [40, cursor+4],:fit=>[50,50]

    data = ([
        [
            {:content => "<b>SRI SATHYA SAI MOBILE HOSPITAL</b><br><br>",
             :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0, :height => 15,
             :size => 13
            },
        ],
        [
            {
                :content => "(A unit of Sri Sathya Sai Central Trust), Puttaparthi, Ananthapur, A.P.",
                :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0, :height => 15,
                :size => 8
            },
        ],
        [
            {
                :content => "<b><u>CHRONIC DISEASES DOCUMENTATION AND MONITORING - #{ailment_details[:ailment_name].upcase}</u></b>",
                :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0,
                :size => 9
            }
        ]
    ])

    table data,
        :cell_style => { :inline_format => true,:width => 150},
        :width => 600,
        :position => :center


  end

  def patient_general_details_block(pgd_array,dm_details,village_date)
    dm_number = dm_details["dm_no"]
        # (dm_details ?  : "")

    pgd = pgd_array.first

    dob_age =
        (pgd.dateOfBirth ? "#{pgd.dateOfBirth.strftime("%e %b %Y")} - #{ApplicationController.new.calculate_age(Date.strptime(pgd.dateOfBirth.to_s),Date.today)} years" : "")

    puts "pgd : #{pgd.inspect}"
    patient_general_details = ([
        [
            {
                :content => "<b>Date : </b> <br>#{village_date} ",
                :width => 80,
                :height => 30
            },
            {
                :content => "<b> CD No. : </b> #{pgd.cdno} <br> <b> DM No. : </b> #{dm_number}",
                :width => 160,
                :colspan => 3
            },
            {
                :content => "<b> Aadhaar No. : </b> #{pgd.aadharNo} <br> <b> Ref. No. : </b> #{pgd.bmNo}",
                :width => 100,
                :colspan => 3
            },
            {
                :content => "<b> SSSMH ID No. : </b> #{pgd.sssmhIdNo}",
                :width => 110,
                :colspan => 2
                # :width => 40,
            }
        ],
        [
            {
                :content => "<b>Name : </b> #{pgd.patient_name} ",
                # :width => 160,
                :height => 20,
                :colspan => 4
            },
            {
                :content => "<b> Date Of Birth & Age : </b> <br> #{dob_age}",
                # :colspan => 2,
                :rowspan => 2
                # :width => 120,
            },
            {
                :content => "<b>Gender : </b> #{(pgd.gender == 1 ? 'Male' : 'Female')}",
                :rowspan => 2,
                :colspan => 2,
                # :width => 80
            },
            {
                :content => "<b> Phone No. : </b> #{pgd.contact}",
                :rowspan => 2,
                :colspan => 2
                # :width => 40,
            }
        ],
        [
            {
                :content => "<b>S/O,D/O,W/O : </b> #{pgd.relationName} ",
                # :width => 130,
                :height => 20,
                :colspan => 4
            }
        ],
        [
            {
                :content => "<b>Village : </b> #{pgd.village_name} ",
                :width => 90,
                :height => 30,
                :colspan => 3
            },
            {
                :content => "<b> Mandal : </b> #{pgd.mandal}",
                :colspan => 2
                # :width => 120,
            },
            {
                :content => "<b>District : </b> #{pgd.district}",
                :colspan => 3
                # :width => 130
            },
            {
                :content => "<b> Annual Income (Rs.): </b> #{pgd.annualIncome}",
                # :width => 40,
            }
        ]    ])

    table patient_general_details,
          :cell_style => { :inline_format => true, :size => 9},
          :position => 3,
          :width => 580
          # :row_colors => ['F0F0A3', nil, nil]

  end


end