json.id      @message.id
json.content @message.content
json.user_name @message.user.name
json.date    @message.created_at.to_s(:datetime)
json.image   @message.image.url
