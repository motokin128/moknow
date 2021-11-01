class PostForm
  include ActiveModel::Model

  attr_accessor :content, :image, :current_user_id, :post, :tag_ids, :category_ids, :delete_ids

  # Post モデルのバリデーション
  validates :content, presence: true, length: { maximum: 2000 }
  # Photo モデルのバリデーション
  validates :image, presence: true, on: :create

  validates :tag_ids, presence: true, length: { maximum: 2 }
  validates :category_ids, presence: true, length: { maximum: 2 }

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      if @post.persisted?
        post_update
      else
        post_create
      end
    end
  end

  private

  def post_update
    if delete_ids.present?
      delete_ids.each do |id|
        Photo.find(id.to_i).destroy!
      end
    end
    if image.present?
      image.each do |img|
        post.photos.build(image: img).save!
      end
    end
    raise ActiveRecord::Rollback unless @post.photos.any?

    @post.update!(content: content, tag_ids: tag_ids, category_ids: category_ids)
  end

  def post_create
    post = Post.new(content: content, user_id: current_user_id, tag_ids: tag_ids, category_ids: category_ids)
    image.each do |img|
      post.photos.build(image: img).save!
    end
  end
end
