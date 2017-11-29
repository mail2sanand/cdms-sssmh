class PatientReviewTemplate < Prawn::Document
  def initialize(report_details)
    super
    @report_details = report_details
    header(report_details[:dm_details])

    patient_general_details_block(report_details[:pgd])

    patient_cmc_block(report_details[:cmc])

    patient_investigation_details_block(report_details[:one_month_examination_detail],report_details[:bs_examination_details])

    patient_treatment_advised_block(report_details[:treatment_advised])
  end

  def patient_treatment_advised_block(treatment_advised)
    patient_treatment_advised_details = ([
        [
            {:content => "<b>Current Medicine : </b>", :border_width => 1},
            {:content => "<b>Treatment Advised</b>", :border_width => 1,:width=>300}
        ],
        [
            {:content => "#{treatment_advised}", :border_width => 1,:height => 100},
            {:content => "", :border_width => 1,:height => 100}
        ]
    ])

    table patient_treatment_advised_details,
          :cell_style => { :inline_format => true,:size => 10},
          # :position => :center,
          :width => 550
    # ,:row_colors => ['F0F0A3']

    move_down 20

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

    last_but_one_visit =
        bs_examination_details[bs_examination_details.length-2] ? bs_examination_details[bs_examination_details.length-2] : empty_visit

    puts "========>> last_but_one_visit : #{last_but_one_visit.inspect}"
    last_but_2_visit =
        bs_examination_details[bs_examination_details.length-3] ? bs_examination_details[bs_examination_details.length-3] : empty_visit

    puts "========>> last_but_2_visit : #{last_but_2_visit.inspect}"

    last_but_3_visit =
        bs_examination_details[bs_examination_details.length-4] ? bs_examination_details[bs_examination_details.length-4] : empty_visit
    puts "========>> last_but_3_visit : #{last_but_3_visit.inspect}"

    last_but_4_visit =
        bs_examination_details[bs_examination_details.length-5] ? bs_examination_details[bs_examination_details.length-5] : empty_visit
    puts "========>> last_but_4_visit : #{last_but_4_visit.inspect}"

    patient_four_month_details = ([
      [
          {
              :content=>"<b>Visit</b>",:width=>70, :border_width => 1
          },
          "<b>FBS (mg/dl)</b>","<b>PPBS (mg/dl)</b>","<b>RBS (mg/dl)</b>",
          {
              :content=>"",:width=>20, :border_width => 0
          },
          {
              :content=>"<b>Clinical Notes</b>", :border_width => 0
          }
      ],
      [
          last_but_one_visit[:visit],last_but_one_visit[:fbs],last_but_one_visit[:ppbs],last_but_one_visit[:rbs],
          {
              :content=>"",:width=>20, :border_width => 0
          },
          {
              :content=>"",:rowspan => 4, :border_width => 1, :width => 300
          }
      ],
      [
          last_but_2_visit[:visit],last_but_2_visit[:fbs],last_but_2_visit[:ppbs],last_but_2_visit[:rbs]
      ],
      [
          last_but_3_visit[:visit],last_but_3_visit[:fbs],last_but_3_visit[:ppbs],last_but_3_visit[:rbs]
      ],
      [
          last_but_4_visit[:visit],last_but_4_visit[:fbs],last_but_4_visit[:ppbs],last_but_4_visit[:rbs]
      ]
    ])

    table patient_one_month_details,
      :cell_style => { :inline_format => true,:height => 20, :size => 10, :position => :center},
      :position => :center,
      :width => 550

    move_down 20

    table patient_four_month_details,
          :cell_style => { :inline_format => true,:height => 20, :size => 10},
          # :position => :center,
          :width => 550

    move_down 20

  end

  def patient_cmc_block(cmc)

    patient_cmc_details = ([
      [
          {:content => "<b>DM : </b> <u>#{cmc[:dm]}</u>", :border_width => 0}, {:content => "", :rowspan => 4, :border_width => 1, :width => 200}
      ],
      [{:content => "<b> HTN : </b>  <u>#{cmc[:htn]}</u>", :border_width => 0}],
      [{:content => "<b> CAD : </b>  <u>#{cmc[:cad]}</u>", :border_width => 0}],
      [{:content => "<b> Chronic Complications : </b>  <u>#{cmc[:chronic_complications]} </u>", :border_width => 0}]
    ])

    table patient_cmc_details,
          :cell_style => { :inline_format => true,:height => 20, :size => 10},
          :position => :center,
          :width => 550
          # ,:row_colors => ['F0F0A3']

    move_down 20

  end

  def patient_general_details_block(pgd_array)
    pgd = pgd_array.first
    patient_general_details = ([
        [
            "<b>SSSMH ID No. : </b> #{pgd.sssmhIdNo}",
            "<b>Name :</b> #{pgd.name}",
            "<b>Age : </b> #{pgd.age}",
            "<b>Gender : </b> #{(pgd.gender == 1 ? 'Male' : 'Female')}"
        ],
        [
            "<b>CD No. : </b> #{pgd.cdno}",
            "<b>Village :</b> #{pgd.village_name}",
            "<b>Ph. No. : </b> #{pgd.contact}",
            "<b>Date : </b> #{Time.now.strftime("%d %b, %Y")}"
        ]
    ])

    table patient_general_details,
          :cell_style => { :inline_format => true,:height => 25, :size => 10},
          :position => :center,
          :width => 600,
          :row_colors => ['F0F0A3', nil, nil]

    move_down 20

  end

  def header(dm_details)

    dm_number = (dm_details ? dm_details.ailment_detail_value : "<u>Prawn::Text::NBSP*33</u>")

    data = ([
       [
           {:content => "<u>MONTHLY REVIEW REPORT</u>", :colspan => 3, :align => :center,:padding => 0, :borders => [:bottom],:border_width => 0},
           {:content => "<u>DM : #{dm_number}</u>", :align => :left,:padding => [0,10,0,0], :borders => [:bottom],:border_width => 0}
           # {:content => "<u>DM : #{Prawn::Text::NBSP*33}</u>", :align => :left,:padding => [0,10,0,0], :borders => [:bottom],:border_width => 0}
       ]
    ])

    table data,
          :cell_style => { :inline_format => true,:width => 150, :height => 20},
          :width => 600,
          :position => :center

    move_down 20

    # text "<u>MONTHLY REVIEW REPORT</u>",
    #      :inline_format => true,
    #      # :align => :center,
    #      :at => [100,100],
    #      :width => 50
  end

  def generate_patient_details_box

    t = make_table([ ["this is the first row"],
                     ["this is the second row"] ])

    t.draw

  end

end