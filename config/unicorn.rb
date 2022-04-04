worker_processes 3
timeout 15
preload_app true

rails_root = File.expand_path("../../", __FILE__)

working_directory rails_root

# listen "#{rails_root}/tmp/unicorn.sock"
listen 4000
pid File.expand_path('../../tmp/unicorn.pid', __FILE__)

old_pid = "#{rails_root}/tmp/unicorn.pid"
if File.exists?(old_pid)
  puts "Found existing unicorn PID"
  begin
    pid = File.read(old_pid).to_i
    File.delete(old_pid)
    Process.kill("QUIT", pid)
    puts "shut down previous unicorn (#{pid})"
  rescue Errno::ENOENT, Errno::ESRCH
    puts "was already dead"
  end
end
puts "unicorn started"
before_fork do |server, worker|
  defined?(ActiveRecord::Base) && ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) && ActiveRecord::Base.establish_connection
end

stderr_path "#{rails_root}/log/unicorn.log"
stdout_path "#{rails_root}/log/unicorn.log"
