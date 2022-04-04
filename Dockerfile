FROM ruby:3.0.0

RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y postgresql-client --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /myapp

COPY ./Gemfile /myapp/Gemfile
COPY ./Gemfile.lock /myapp/Gemfile.lock

RUN gem install bundler
RUN bundle install

VOLUME /tmp

# Add a script to be executed every time the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process
CMD ["unicorn", "-c", "config/unicorn.rb", "-D", "-E", "development"]
