require "carrierwave/storage/abstract"
require "carrierwave/storage/file"
require "carrierwave/storage/fog"

CarrierWave.configure do |config|
  config.storage :fog
  config.fog_provider = "fog/aws"
  config.fog_directory = ENV["AWS_S3_BUCKET_NAME"]
  config.asset_host = "https://" + ENV["AWS_S3_BUCKET_NAME"] + ".s3-ap-northeast-1.amazonaws.com"
  config.fog_credentials = {
    provider: "AWS",
    aws_access_key_id: ENV["AWS_S3_ACCESS_KEY_ID"],
    aws_secret_access_key: ENV["AWS_S3_SECRET_ACCESS_KEY"],
    region: "ap-northeast-1",
    path_style: true,
  }
end
