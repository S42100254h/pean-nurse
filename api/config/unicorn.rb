rails_env = ENV["RAILS_ENV"] || "development"

if rails_env == "development"
  worker_processes 1
  timeout 10000
else
  worker_processes Integer(ENV["WEB_CONCURRENCY"] || 3)
  timeout 15
  preload_app true
end

rails_root = File.expand_path("..", __dir__)

working_directory rails_root

listen "#{rails_root}/tmp/unicorn.sock"
# listen 4000
pid File.expand_path("../tmp/unicorn.pid", __dir__)

old_pid = "#{rails_root}/tmp/unicorn.pid"
if File.exist?(old_pid)
  begin
    pid = File.read(old_pid).to_i
    File.delete(old_pid)
    Process.kill("QUIT", pid)
  rescue Errno::ENOENT, Errno::ESRCH
  end
end
before_fork do |_server, _worker|
  defined?(ActiveRecord::Base) && ActiveRecord::Base.connection.disconnect!
end

after_fork do |_server, _worker|
  defined?(ActiveRecord::Base) && ActiveRecord::Base.establish_connection
end

# stderr_path "#{rails_root}/log/unicorn.log"
# stdout_path "#{rails_root}/log/unicorn.log"
