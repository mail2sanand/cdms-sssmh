class PatientReviewTemplate < Prawn::Document
  def initialize(report_details,margin=[10,1,10,60])
    super(:margin => margin, :page_size => "A4")

    font_families.update(
        "helvitica" => {
            :normal => "#{Rails.root.join("app/assets/header/fonts/HELR45W.ttf")}",
            :bold => "#{Rails.root.join("app/assets/header/fonts/Helvetica-Bold.ttf")}",
            :italic => "#{Rails.root.join("app/assets/header/fonts/HELR45W.ttf")}"
        }
    )

    stroke_color "ec1515"
    stroke_bounds

    stroke_color "060606"

    @report_details = report_details
    header(ailment_details = report_details[:ailment_details])

    move_down 15

    patient_general_details_block(report_details[:pgd],report_details[:dm_details])

    move_down 10

    patient_cmc_block(report_details[:cmc])

    move_down 10

    patient_investigation_details_block(report_details[:one_month_examination_detail],report_details[:bs_examination_details])

    move_down 10

    patient_treatment_advised_block(report_details[:current_medicine])
  end

  def header(ailment_details)

    # dm_number = (dm_details ? dm_details.ailment_detail_value : "<u>Prawn::Text::NBSP*33</u>")
    image "#{Rails.root.join('app/assets/images/sssmh_reports_header.png')}",
          :at => [20, cursor-7],:fit=>[50,50]

    data = ([
        [
            {:content => "<b>SRI SATHYA SAI MOBILE HOSPITAL</b><br><br>",
             :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0, :height => 15,
             :size => 10
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
                :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0, :height => 15,
                :size => 9
            },
        ],
        [
            {
                :content => "<b><u>MONTHLY REVIEW REPORT</u></b>",
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

  def patient_general_details_block(pgd_array,dm_details)
    puts "pgd_array : #{pgd_array.inspect}"
    dm_number = dm_details["dm_no"]
    # (dm_details ?  : "")

    pgd = pgd_array.first
    date = Time.now.strftime('%d %b, %Y')

    dob_age =
        (pgd.dateOfBirth ? "#{pgd.dateOfBirth.strftime("%e %b %Y")} - #{ApplicationController.new.calculate_age(Date.strptime(pgd.dateOfBirth.to_s),Date.today)} years" : "")

    puts "pgd : #{pgd.inspect}"
    patient_general_details = ([
        [
            {
                :content => "<b>Date :</b>  #{date}",
                :width => 95,
                :height => 30
            },
            {
                :content => "<b> CD No. : </b> #{pgd.cdno} <br> <b> DM No. : </b> #{dm_number}",
                :width => 120,
                :colspan => 3
            },
            {
                :content => "<b> Aadhaar No. : </b> #{pgd.aadharNo} <br> <b> Ref. No. : </b> #{pgd.bmNo}",
                :width => 100,
                :colspan => 2
            },
            {
                :content => "<b> SSSMH ID No. : </b> #{pgd.sssmhIdNo}",
                :width => 50,
                :colspan => 2
                # :width => 40,
            }
        ],
        [
            {
                :content => "<b>Name : </b> #{pgd.patient_name} ",
                :width => 80,
                :height => 20,
                :colspan => 4
            },
            {
                :content => "<b> Date Of Birth & Age</b> <br> #{dob_age}",
                # :colspan => 2,
                :rowspan => 2,
                :width => 100
            },
            {
                :content => "<b>Gender : </b> #{(pgd.gender == 1 ? 'Male' : 'Female')}",
                :rowspan => 2,
                :colspan => 1,
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
                # :width => 100,
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
                :colspan => 2
                # :width => 130
            },
            {
                :content => "<b> Annual Income (Rs.): </b> #{pgd.annualIncome}",
                # :width => 60,
            }
        ]    ])

    table patient_general_details,
          :cell_style => { :inline_format => true, :size => 9},
          :position => 3,
          :width => 516
    # :row_colors => ['F0F0A3', nil, nil]

  end


  def patient_cmc_block(cmc)

    cmc_replace_hash = {
        "&uarr;" => "\u2191",
        "&darr;" => "\u2193"
    }
    chronic_complications_text = cmc[:chronic_complications]

    cmc_replace_hash.each do|key,value|
      chronic_complications_text = chronic_complications_text.gsub(key,value)
    end

    patient_cmc_details = ([
        [
            {:content => "<b>DM : </b> <u>#{cmc[:dm]}</u>", :border_width => 0,:width => 180},
            {:content => "", :rowspan => 3, :border_width => 1, :width => 50}
        ],
        [{:content => "<b> HTN : </b>  <u>#{cmc[:htn]}</u>", :border_width => 0}]
        # [{:content => "<b> CAD : </b>  <u>#{cmc[:cad]}</u>", :border_width => 0}]
        # [{:content => "\u2191", :border_width => 0, :font => "helvitica"}]
    # ,[{:content => "<b> Chronic Complications : </b>  <u> #{uarr}  </u>",  :border_width => 0}]
    ])

    table patient_cmc_details,
          :cell_style => {:inline_format => true,:height => 20, :size => 9},
          # :position => ,
          :width => 530

    # font("open-sans-ttf"){ text "\u2191"}

    move_down 10

    bounding_box([5,cursor], :width=>530) do
      font("helvitica", :size => 9){
        text "<b> CAD : </b>  <u>#{cmc[:cad]}</u>",
             :inline_format => true
      }
    end

    move_down 10

    bounding_box([5,cursor], :width=>580) do
      font("helvitica", :size => 9){
        text "<b>Chronic Complications </b>:  #{chronic_complications_text}",
             :inline_format => true
      }
    end

  end

  def patient_investigation_details_block(one_month_examination_detail,bs_examination_details)
    weight = one_month_examination_detail[:weight]
    bp = one_month_examination_detail[:bp]
    pulse = one_month_examination_detail[:pulse]
    fbs = one_month_examination_detail[:fbs]
    ppbs = one_month_examination_detail[:ppbs]
    rbs = one_month_examination_detail[:rbs]

    patient_one_month_details = ([
        [
            {:content => "<b>Wt</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} Kgs</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{weight ? weight : Prawn::Text::NBSP*10} Kgs</u>", :border_width => 0},
            {:content => "<b>Hypoglycemic Attacks : </b>", :border_width => 0},
            {:content => "<u>#{Prawn::Text::NBSP*30} </u>", :border_width => 0}
        ],
        [
            {:content => "<b>B.P.</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} mmHg</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{bp ? bp : Prawn::Text::NBSP*10} mmHg</u>", :border_width => 0},
            {:content => "<b>Infective Focus : </b>", :border_width => 0},
            {:content => "<u>#{Prawn::Text::NBSP*30}</u>", :border_width => 0}
        ],
        [
            {:content => "<b>Pulse</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} /min</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{pulse ? pulse : Prawn::Text::NBSP*10} /min</u>", :border_width => 0},
            {:content => "<b>Diet : </b>", :border_width => 0},
            {:content => "<u>#{Prawn::Text::NBSP*30}</u>", :border_width => 0}
        ],
        [
            {:content => "<b>FBS</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} mg/dl</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{fbs ? fbs : Prawn::Text::NBSP*20} mg/dl</u>", :border_width => 0},
            {:content => "<b>Excercise : </b>", :border_width => 0},
            {:content => "<u>#{Prawn::Text::NBSP*30}</u>", :border_width => 0}
        ],
        [
            {:content => "<b>PPBS</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} mg/dl</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{ppbs ? ppbs : Prawn::Text::NBSP*10} mg/dl</u>", :border_width => 0, :colspan => 3}
        ],
        [
            {:content => "<b>RBS</b>", :border_width => 0},
            {:content => ": <u>#{Prawn::Text::NBSP*20} mg/dl</u>", :border_width => 0},
            {:content => "<b>Last Month : </b> <u>#{rbs ? rbs : Prawn::Text::NBSP*10} mg/dl</u>", :border_width => 0, :colspan => 3}
        ]
    ])

    empty_visit = {
        :visit => "",
        :fbs => "",
        :ppbs => "",
        :rbs => "",
    }

    puts "last But Four : #{bs_examination_details[bs_examination_details.length-4]}"
    last_but_one_visit_record = bs_examination_details.shift
    last_but_one_visit = last_but_one_visit_record ? last_but_one_visit_record : empty_visit
        # bs_examination_details[bs_examination_details.length-4] ? bs_examination_details[bs_examination_details.length-5] : empty_visit

    puts "last But Three : #{bs_examination_details[bs_examination_details.length-3]}"
    last_but_2_visit_record = bs_examination_details.shift
    last_but_2_visit = last_but_2_visit_record ? last_but_2_visit_record : empty_visit
        # bs_examination_details[bs_examination_details.length-3] ? bs_examination_details[bs_examination_details.length-4] : empty_visit

    puts "last But Two : #{bs_examination_details[bs_examination_details.length-2]}"
    last_but_3_visit_record = bs_examination_details.shift
    last_but_3_visit = last_but_3_visit_record ? last_but_3_visit_record : empty_visit
        # bs_examination_details[bs_examination_details.length-2] ? bs_examination_details[bs_examination_details.length-3] : empty_visit

    puts "last But One : #{bs_examination_details[bs_examination_details.length-1]}"
    last_but_4_visit_record = bs_examination_details.shift
    last_but_4_visit = last_but_4_visit_record ? last_but_4_visit_record : empty_visit
        # bs_examination_details[bs_examination_details.length-1] ? bs_examination_details[bs_examination_details.length-2] : empty_visit



    # puts "last But One : #{bs_examination_details[bs_examination_details.length-1]}"
    # last_but_one_visit =
    #     bs_examination_details[bs_examination_details.length-2] ? bs_examination_details[bs_examination_details.length-2] : empty_visit
    #
    # puts "last But Two : #{bs_examination_details[bs_examination_details.length-2]}"
    # last_but_2_visit =
    #     bs_examination_details[bs_examination_details.length-3] ? bs_examination_details[bs_examination_details.length-3] : empty_visit
    #
    # puts "last But Three : #{bs_examination_details[bs_examination_details.length-3]}"
    # last_but_3_visit =
    #     bs_examination_details[bs_examination_details.length-4] ? bs_examination_details[bs_examination_details.length-4] : empty_visit
    #
    # puts "last But Four : #{bs_examination_details[bs_examination_details.length-4]}"
    # last_but_4_visit =
    #     bs_examination_details[bs_examination_details.length-5] ? bs_examination_details[bs_examination_details.length-5] : empty_visit

    patient_four_month_details = ([
      [
          {
              :content=>"<b>Visit</b>",:border_width => 1,:height=>20,:width=>60 #, :rowspan=>2
          },
          {
              :content=>"<b>FBS<br>(mg/dl)</b>",:width=>35, :border_width => 1 #, :rowspan=>2
          },
          {
              :content=>"<b>PPBS<br>(mg/dl)</b>",:width=>35, :border_width => 1#, :rowspan=>2
          },
          {
              :content=>"<b>RBS<br>(mg/dl)</b>",:width=>35, :border_width => 1#, :rowspan=>2
          },
          {
              :content=>"",:width=>5, :border_width => 0
          },
          {
              :content=>"<b>Clinical Notes</b>", :border_width => 1, :rowspan=>5,:width => 320
          }
      ],
      [
          {
              :content=>"#{last_but_one_visit[:visit]}",:border_width => 1,:width=>30,:height => 20
          },
          last_but_one_visit[:fbs],last_but_one_visit[:ppbs],last_but_one_visit[:rbs],
          {
              :content=>"",:width=>10, :border_width => 0
          },
          # {
          #     :content=>"", :border_width => 1, :width => 370, :rowspan=>4
          # }
      ],
      [
          {
              :content=>"#{last_but_2_visit[:visit]}",:border_width => 1,:width=>30,:height => 20
          },
          last_but_2_visit[:fbs],last_but_2_visit[:ppbs],last_but_2_visit[:rbs]
      ],
      [
          {
              :content=>"#{last_but_3_visit[:visit]}",:border_width => 1,:width=>30,:height => 20
          },
          last_but_3_visit[:fbs],last_but_3_visit[:ppbs],last_but_3_visit[:rbs]
      ],
      [
          {
              :content=>"#{last_but_4_visit[:visit]}",:border_width => 1,:width=>30,:height => 20
          },
          last_but_4_visit[:fbs],last_but_4_visit[:ppbs],last_but_4_visit[:rbs]
      ]
    ])

    bounding_box([1,cursor], :width=>530) do
      table patient_one_month_details,
        :cell_style => { :inline_format => true,:height => 20, :size => 9},
        :width => 550
    end

    move_down 10

    bounding_box([5,cursor], :width=>500) do
      table patient_four_month_details,
            :cell_style => { :inline_format => true, :size => 8},
            # :position => :center,
            :width => 525
            # :width => 917

    end


  end

  def patient_treatment_advised_block(treatment_advised)
    patient_treatment_advised_details = ([
        [
            {:content => "<b>Current Medication : </b>", :border_width => 1,:size => 9},
            {:content => "<b>Treatment Advised</b>", :border_width => 1,:width=>300,:size => 9}
        ],
        [
            {:content => "#{treatment_advised}", :border_width => 1,:size => 9},
            {:content => "", :border_width => 1,:height => 260}
        ]
    ])

    bounding_box([5,cursor], :width=>580) do
      table patient_treatment_advised_details,
            :cell_style => { :inline_format => true},
            # :position => :center,
            :width => 525
    end

    # ,:row_colors => ['F0F0A3']

    move_down 20

  end



end