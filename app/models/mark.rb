class Mark < ApplicationRecord
  belongs_to :user
  belongs_to :post, counter_cache: :marks_count
  validates :user_id, uniqueness: {
    scope: :post_id,
    message: 'は同じ投稿に2回以上マークはできません'
  }
end
