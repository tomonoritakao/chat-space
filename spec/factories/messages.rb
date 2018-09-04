FactoryGirl.define do
	factory :message do
		content Faker::Lorem.sentence
		image File.open("#{Rails.root}/public/test.jpeg")
		user
		group
	end
end