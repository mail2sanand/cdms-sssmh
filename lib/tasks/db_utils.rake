namespace :db_utils do
  desc "Restore Dev Data in DB"
  task :restore_dev_data => :environment do
    cmd = ""

    with_config do |db, user|
      cmd = "psql -d #{db} -f public/cdms_staging.sql -U#{user}"
      # cmd = "pg_restore --verbose --host localhost --username #{user} --clean --no-owner --no-acl --dbname #{db} #{Rails.root}/public/cdms_staging.sql"
    end

    Rake::Task["db:drop"].invoke
    Rake::Task["db:create"].invoke
    puts cmd
    exec cmd

    # puts "--------"
    # ActiveRecord::Base.connection.exec_query("SELECT setval('villages_id_seq', COALESCE((SELECT MAX(id)+1 FROM public.villages), 1), false)")
    # puts "--------"
  end

  task :set_sequence_values => :environment do
    puts "--------"
    ActiveRecord::Base.connection.exec_query("SELECT setval('villages_id_seq', COALESCE((SELECT MAX(id)+1 FROM public.villages), 1), false)")
    puts "--------"
  end

  task :db_restore_and_set_seq_val => :environment do
    Rake::Task["db_utils:set_sequence_values"].invoke
    puts "00000000000000000000000"
    Rake::Task["db_utils:restore_dev_data"].invoke
    puts "00000000000000000000000"
  end

  def with_config
    yield ActiveRecord::Base.connection_config[:database],
      ActiveRecord::Base.connection_config[:username]
  end
end