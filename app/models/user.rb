class User < ApplicationRecord
  has_secure_password 
  has_many :user_books, dependent: :destroy 
  has_many :books, through: :user_books 
end
